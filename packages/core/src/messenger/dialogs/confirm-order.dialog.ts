/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Client } from '@smartfood/client';
import { makeDictionayByIndex } from '@smartfood/common';
import { get } from 'lodash';
import { MessengerClient } from 'messaging-api-messenger';
import { firstValueFrom } from 'rxjs';
import { PAYMENT_METHODS } from '../../common';
import { messengerData } from '../../common/data';
import { InjectMessenger, InjectSdk } from '../../common/providers';
import { createMapper, messagePick, messageUtils } from '../../common/utils';
import { ACTIONS } from '../actions';
import { BUTTON_TYPE, MessengerEvent } from '../enums';
import { MessengerEventBus } from '../eventBus';
import { FLOWS } from '../flows';
import { MessengerWrapper, OrderService } from '../services';
import { SessionManager } from '../session.manager';
@Injectable()
export class ConfirmeOrder {
  constructor(
    private readonly eventBus: MessengerEventBus,
    @InjectMessenger() private readonly messengerClient: MessengerClient,
    private messengerWrapper: MessengerWrapper,
    private orderService: OrderService,
    private sessionManager: SessionManager,
    @InjectSdk() private readonly sdk: Client,
  ) {
    this.handleShippingAddress();
    this.handlePayment();
  }
  handlePayment() {
    this.eventBus
      .ofType(MessengerEvent.POSTBACK, FLOWS.START_PAYMENT)
      .subscribe(async (response) => {
        const senderId = response.message.sender.id;
        const order = response.session.getOrderHandler();
        const paymentMethod = await this.requestPaymentMethod(senderId);
        if (paymentMethod) {
          order.setMetadata({
            paymentMethod: paymentMethod,
          });
          await this.sendOrderConfirmation(senderId);
        }
      });
  }
  handleShippingAddress() {
    this.eventBus
      .ofType(MessengerEvent.POSTBACK, FLOWS.START_SHIPPING_INFORMATION)
      .subscribe(async (response) => {
        const act = async () => {
          const senderId = response.message.sender.id;
          const result = await this.requestShippingInformation(senderId);
          // dirección de envio
          response.session.getOrderHandler().setMetadata({
            direction: result.direction,
            pickUpPerson: result.pickUpPerson,
            phone: result.phone,
            note: result.note,
          });

          // Move this code to a method

          const message = response.session
            .getOrderHandler()
            .shippingAddressMessage();

          const source$ = this.messengerWrapper.awaitResponse(
            MessengerEvent.POSTBACK,
            [ACTIONS.RESET_SHIPPING_INFORMATION, ACTIONS.CONFIRM_DIRECTION],
          )(senderId, async () => {
            await this.messengerClient.sendButtonTemplate(senderId, message, [
              {
                title: 'Volver a ingresar',
                type: 'postback',
                payload: ACTIONS.RESET_SHIPPING_INFORMATION,
              },
              {
                title: 'Confirmar',
                type: 'postback',
                payload: FLOWS.START_PAYMENT,
              },
            ]);
          });
          const decision = await firstValueFrom(source$);
          const postback = decision.message.postback.payload;
          return postback;
        };

        let postback = await act();
        while (postback === ACTIONS.RESET_SHIPPING_INFORMATION) {
          postback = await act();
        }
      });
  }

  async sendOrderConfirmation(senderId: string) {
    const session = this.sessionManager.getSession(senderId);
    const orderHandler = session.getOrderHandler();
    const msg = orderHandler.toMessage();

    const source$ = this.messengerWrapper.awaitResponse(
      MessengerEvent.POSTBACK,
      ['CONFIRM'],
    )(senderId, async () => {
      this.messengerClient.sendButtonTemplate(senderId, msg, [
        {
          title: 'Confirmar',
          type: BUTTON_TYPE.POSTBACK,
          payload: 'CONFIRM',
        },
      ]);
    });
    const decision = await firstValueFrom(source$);
    const postback = messagePick.postBack(decision);
    if (postback == 'CONFIRM') {
      const requestQuantity = async () => {
        const source$ = this.messengerWrapper
          .sendText(senderId, '¿Cuantas unidades desea?')
          .pipe(this.messengerWrapper.onlyTextOperator);
        const decision = await firstValueFrom(source$);
        const quantity = parseInt(decision, 10);
        return quantity;
      };
      let quantity = await requestQuantity();
      let rep = true;
      while (isNaN(quantity) && rep) {
        const yes = await this.messengerWrapper.confirm(
          senderId,
          messageUtils.format(
            'Lo que a ingreseado no parece un número, ¿Desea intentarlo de nuevo?',
          ),
        );
        if (!yes) {
          rep = false;
          break;
        }
        quantity = await requestQuantity();
      }
      orderHandler.quantity = quantity;
      await this.saveOrder(senderId);
    }

    return postback;
  }

  private async saveOrder(senderId: string) {
    const session = this.sessionManager.getSession(senderId);
    const orderHandler = session.getOrderHandler();
    const orderSerialized = orderHandler.serializeOrder();
    const order = await this.sdk.patchOrder({
      metadata: {
        direction: orderSerialized.metadata.direction,
        payment: orderSerialized.metadata.payment as any,
        phone: orderSerialized.metadata.phone,
      },
    });

    
    const itemSerialized = orderHandler.serializeOrderLine();
    await this.sdk.patchOrderLine({
      orderId: order.id,
      orderLine: itemSerialized.orderLine,
      orderLineId: null,
    });
    await this.messengerClient.sendText(
      senderId,
      messageUtils.format(
        'Su pedido se ha realizado con éxito',
        messageUtils.separator,
        "Llamaremos para coordinar la entrega",
        `Nro de Orden: ${order.orderNumber}`,
      ),
    );
    return order;
  }

  async requestPaymentMethod(senderid: string) {
    const selection = PAYMENT_METHODS.selection;
    const dictionary = makeDictionayByIndex(selection);
    const message = messageUtils.format(
      `¿Por que medio de pago deseas pagar?`,
      ...Object.keys(dictionary).map(
        (key) => `${key}- ${dictionary[key].label}`,
      ),
    );

    const alternatives = createMapper(dictionary);

    const intent = async () => {
      const resp = this.messengerWrapper
        .sendText(senderid, message)
        .pipe(this.messengerWrapper.onlyTextOperator);
      const paymentMethod = await firstValueFrom(resp);
      const rep = get(alternatives, paymentMethod);
      return rep;
    };
    let rep = await intent();
    while (!rep) {
      rep = await intent();
    }
    return rep;
  }

  async requestShippingInformation(senderId: string) {
    const result: any = {};
    const cuestions = messengerData.confirmOrder.messages.cuestions;
    // direction
    const source$ = this.messengerWrapper.sendText(
      senderId,
      cuestions.direction.text,
    );

    const direction = await firstValueFrom(
      source$.pipe(this.messengerWrapper.onlyTextOperator),
    );
    result['direction'] = direction;

    // pickUpPerson
    const source$2 = this.messengerWrapper.sendText(
      senderId,
      cuestions.pickUpPerson.text,
    );
    const pickUpPerson = await firstValueFrom(
      source$2.pipe(this.messengerWrapper.onlyTextOperator),
    );

    result['pickUpPerson'] = pickUpPerson;

    // phone
    const source$3 = this.messengerWrapper.sendText(
      senderId,
      cuestions.phone.text,
    );
    const phone = await firstValueFrom(
      source$3.pipe(this.messengerWrapper.onlyTextOperator),
    );
    result['phone'] = phone;

    // note
    const source$4 = this.messengerWrapper.sendText(
      senderId,
      cuestions.note.text,
    );
    const note = await firstValueFrom(
      source$4.pipe(this.messengerWrapper.onlyTextOperator),
    );
    result['note'] = note;
    return result;
  }
}

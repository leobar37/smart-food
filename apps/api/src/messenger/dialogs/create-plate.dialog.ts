/* eslint-disable prettier/prettier */
import { Option, ProductBuildeableService } from '@App/core';
import { makeDictionayByIndex } from '@App/utiliies';
import { Injectable } from '@nestjs/common';
import { get } from 'lodash';
import { MessengerClient } from 'messaging-api-messenger';
import { firstValueFrom, map } from 'rxjs';
import { ACTIONS, FLOWS } from '@App/constants';
import { BUTTON_TYPE, MessengerEvent } from '../enums';
import { BotError, BOT_ERRORS } from '../error';
import { MessengerEventBus } from '../eventBus';
import { OrderHandler } from '../model/Order';
import { InjectMessenger } from '../providers';
import { MessengerWrapper } from '../services';
import { SessionManager } from '../session.manager';
import { createMapper, messageUtils } from '../utils';
import { messagePick } from '../utils/pick';
@Injectable()
export class CreatePlateDialog {
  constructor(
    private readonly eventBus: MessengerEventBus,
    @InjectMessenger() private readonly messengerClient: MessengerClient,
    private readonly productBuildeableService: ProductBuildeableService,
    private messengerWrapper: MessengerWrapper,
    private sessionManager: SessionManager,
  ) {
    this.handle();
  }
  handle() {
    this.eventBus
      .ofType(MessengerEvent.POSTBACK, [FLOWS.START_CREATE_PLATE])
      .subscribe(async (response) => {
        const senderId = response.message.sender.id;
        const productId = await this.requestPlate(senderId);
        if (productId) {
          await this.processSelectBuildebleTask(senderId, productId);
        }
      });
  }

  async requestPlate(senderId: string) {
    const userId = senderId;
    const products = await this.productBuildeableService.getAllProducts();
    const dictionary = makeDictionayByIndex(products);
    const platesMessage = messageUtils.format(
      '*Estos son nuestras opciones para ti*',
      messageUtils.separator,
      'Escribe el número de la opción para continuar',
      '',
      ...Object.keys(dictionary).map(
        (key) => `${key}. ${dictionary[key].name}`,
      ),
    );
    const mapper = createMapper(dictionary);

    const sendMessage = async () => {
      const source$ = this.messengerWrapper
        .sendText(userId, platesMessage)
        .pipe(this.messengerWrapper.onlyTextOperator);
      const result = await firstValueFrom(source$);
      return get(mapper, result, null);
    };

    let productId = await sendMessage();

    while (!productId) {
      const confirm = await this.messengerWrapper.confirm(
        senderId,
        'No te entiendo, ¿quieres volver a intentarlo?',
      );

      if (confirm) {
        productId = await sendMessage();
      } else {
        break;
      }
    }

    const order = new OrderHandler();
    const product = await this.productBuildeableService.getProductById(
      Number(productId),
    );
    order.addProduct(product);
    const session = this.sessionManager.getSession(userId);
    if (!session) {
    } else {
      this.sessionManager.getSession(userId)?.storeOrder(order);
    }
    return productId;
  }

  async processSelectBuildebleTask(senderId: string, producId: number) {
    const options = await this.productBuildeableService.getOptionsByProductId(
      producId,
    );
    const queueOptions = Object.assign([] as any as Option, options);

    let option = queueOptions.shift();

    try {
      while (option) {
        await this.startRequestOptions(senderId, option);
        option = queueOptions.shift();
      }
      await this.showOrderResume(senderId);
    } catch (error) {
      if (error instanceof BotError) {
        switch (error.code) {
          case BOT_ERRORS.CANCEL_ORDER: {
            await this.messengerClient.sendText(
              senderId,
              'Su orden se ha cancelado con éxito',
            );
            break;
          }
        }
      }
    }
  }

  async startRequestOptions(senderId: string, parent: Option) {
    const options = await this.productBuildeableService.getOptionsByOptionsId(
      parent.id,
    );
    const dictionary = makeDictionayByIndex(options);
    const mapper = createMapper(dictionary);

    const selection = new Set();
    const makeMessage = () => {
      const message = messageUtils.format(
        `*${parent.label}*`,
        messageUtils.separator,
        ...Object.keys(dictionary).map((el) => {
          const option = dictionary[el];
          const isSelected = selection.has(option.id);
          return `${isSelected ? '✔' : el + ')'} ${dictionary[el].name}`;
        }),
      );
      return message;
    };

    let limit = parent.limit;
    while (limit > 0) {
      const source$ = this.messengerWrapper.sendText(senderId, makeMessage(), {
        quickReplies: [
          {
            payload: 'NEXT_STEP',
            title: 'Saltar',
            contentType: 'text',
          },
          {
            payload: 'CANCEL_ORDER',
            title: 'Cancelar Orden',
            contentType: 'text',
          },
        ],
      });
      const userResult = await firstValueFrom(source$);
      const msgResult = messagePick.messageText(userResult);
      const payload = messagePick.replyPayload(userResult);
      const resultId = get(mapper, msgResult, null);
      if (!resultId) {
      }
      if (resultId) {
        if (!selection.has(resultId)) {
          limit--;
        }
        selection.add(resultId);
      }
      if (payload === 'NEXT_STEP') {
        limit = 0;
      }
      if (payload === 'CANCEL_ORDER') {
        const resp = await firstValueFrom(
          this.messengerWrapper
            .sendText(senderId, '¿Estas seguro de cancelar la orden?', {
              quickReplies: [
                {
                  contentType: 'text',
                  title: 'Si',
                  payload: 'yes',
                },
                {
                  contentType: 'text',
                  title: 'No',
                  payload: 'no',
                },
              ],
            })
            .pipe(map((e) => messagePick.replyPayload(e))),
        );

        if ((resp as any as string) === 'yes') {
          throw new BotError(senderId, 'CANCEL_ORDER');
        }
      }
      if (limit == 0) {
        const selectedOption = options.filter((el) => selection.has(el.id));
        const confirm = await this.showConfirmationOptions(
          senderId,
          selectedOption,
        );
        if (!confirm) {
          selection.clear();
          limit = parent.limit;
        } else {
          const session = this.sessionManager.getSession(senderId);
          if (session) {
            selectedOption.forEach((option) => {
              session.getOrderHandler().addOption(parent, option);
            });
          }
        }
      }
    }
    // user select add options
  }

  async showOrderResume(senderId: string) {
    const session = this.sessionManager.getSession(senderId);
    if (!session) {
      console.log('Sessión no found');
    } else {
      const order = session.getOrderHandler();
      this.messengerClient.sendButtonTemplate(
        senderId,
        order.orderResumeMessage(),
        [
          {
            title: 'Pedir nuevamente',
            type: BUTTON_TYPE.POSTBACK,
            payload: FLOWS.START_CREATE_PLATE,
          },
          {
            title: 'Confirmar',
            type: BUTTON_TYPE.POSTBACK,
            payload: FLOWS.START_SHIPPING_INFORMATION,
          },
        ],
      );
    }
  }

  async showConfirmationOptions(senderId: string, selection: Option[]) {
    const selectionText =
      selection.length > 0
        ? selection.map((el) => `✅${el.name}`)
        : ['Ninguno'];
    const message = messageUtils.format(
      '¿Desea confirmar su selección?',
      '',
      'Selección:',
      '',
      ...selectionText,
    );

    const confirmation$ = this.messengerWrapper.sendText(senderId, message, {
      quickReplies: [
        {
          contentType: 'text',
          payload: ACTIONS.CONFIRM_OPTIONS,
          title: 'Confirmar',
        },
        {
          contentType: 'text',
          payload: ACTIONS.RESET_OPTIONS,
          title: 'Elegir nuevamente',
        },
      ],
    });
    const confirmationResult = await firstValueFrom(confirmation$);
    const confirmationPayload = messagePick.replyPayload(confirmationResult);
    return confirmationPayload === ACTIONS.CONFIRM_OPTIONS;
  }
}

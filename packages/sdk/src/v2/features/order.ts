import { DeliveryTypeEnum, OrderMetadata } from '@smartfood/common';
import {
  PatchOrderLineMutationVariables,
  PatchOrderMutationVariables,
} from '../generated';
import { Feature } from './base';
import { omit } from 'lodash';
import { PATCH_ORDERLINE_COMMANDS } from '@smartfood/common';
export type CreateOrderArgs = Omit<PatchOrderMutationVariables, 'metadata'> & {
  metadata?: OrderMetadata;
};

export type CreateLineArgs = PatchOrderLineMutationVariables['orderLine'];
export type UpdateLineArgs = PatchOrderLineMutationVariables['orderLine'] &
  Pick<PatchOrderLineMutationVariables, 'command'>;

export class OrderHandler extends Feature {
  ORDER_ID_KEY = 'CURRENT_ORDER_ID';

  async get() {
    const orderId = this.client.storage.get(this.ORDER_ID_KEY);
    if (!orderId) {
      return null;
    }
    const result = await this.client.wrap(
      this.client.api.getOrder({
        orderId: orderId,
      }),
    );

    return result.ecoOrder;
  }

  /**
   *  TODO: the email si not implemented for now because we do not yet handle the customer as an entity
   */
  async create(params?: CreateOrderArgs) {
    const result = await this.client.wrap(
      this.client.api.patchOrder({
        metadata: params?.metadata,
        paymentMethod: params?.paymentMethod,
      }),
    );

    const order = result.makeOrder;

    this.client.storage.set(this.ORDER_ID_KEY, order.id);

    return order;
  }

  async update(params: CreateOrderArgs) {
    let orderId = this.client.storage.get(this.ORDER_ID_KEY);
    let metadata = params.metadata;
    if (
      (metadata.deliveryDetails.deliveryType as any) === DeliveryTypeEnum.SEDE
    ) {
      metadata = omit(metadata, 'reference', 'direction');
    }
    const result = await this.client.wrap(
      this.client.api.patchOrder({
        orderId: orderId,
        metadata: metadata,
        paymentMethod: params.paymentMethod,
      }),
    );

    const order = result.makeOrder;

    this.client.storage.set(this.ORDER_ID_KEY, order.id);

    return order;
  }

  async addLine(line: CreateLineArgs) {
    let orderId = this.client.storage.get(this.ORDER_ID_KEY);

    if (!orderId) {
      const order = await this.create();
      orderId = order?.id;
    }

    if (!orderId) {
      return;
    }

    const result = await this.client.wrap(
      this.client.api.patchOrderLine({
        orderId: orderId,
        orderLine: line,
        command: PATCH_ORDERLINE_COMMANDS.update_line,
      }),
    );

    if (result?.patchOrderLine) {
      this.client.storage.set(this.ORDER_ID_KEY, result.patchOrderLine.id);
    }

    return result.patchOrderLine;
  }

  async updateLine(id: string, line: UpdateLineArgs) {
    const orderId = this.client.storage.get(this.ORDER_ID_KEY);

    if (!orderId) {
      return;
    }

    const result = await this.client.wrap(
      this.client.api.patchOrderLine({
        orderId: orderId,
        orderLine: omit(line, 'command'),
        orderLineId: id,
        command: line.command,
      }),
    );
    if (result?.patchOrderLine) {
      this.client.storage.set(this.ORDER_ID_KEY, result.patchOrderLine.id);
    }
    return result?.patchOrderLine;
  }

  async deleteLine(id: string) {
    const orderId = this.client.storage.get(this.ORDER_ID_KEY);

    if (!orderId) {
      return;
    }

    const result = await this.client.wrap(
      this.client.api.deleteOrderLine({
        lineOrderId: id,
        orderId: orderId,
      }),
    );

    if (result?.customDeleteOrderLine) {
      this.client.storage.set(
        this.ORDER_ID_KEY,
        result.customDeleteOrderLine.id,
      );
    }

    return result?.customDeleteOrderLine;
  }
}

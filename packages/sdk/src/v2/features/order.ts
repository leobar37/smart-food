import {
  Order,
  OrderOutput,
  PatchOrderLineMutationVariables,
  PatchOrderMutationVariables,
} from '../generated';
import { Feature } from './base';

type CreateOrderArgs = {} & PatchOrderMutationVariables['metadata'];

type CreateLineArgs = PatchOrderLineMutationVariables['orderLine'];

export class OrderHandler extends Feature {
  ORDER_KEY = 'CURRENT_ORDER';
  /**
   *  TODO: the email si not implemented for now because we do not yet handle the customer as an entity
   */
  async create(params: CreateOrderArgs) {
    const result = await this.client.wrap(
      this.client.api.patchOrder({
        metadata: {
          direction: params.direction,
          payment: params.payment,
          phone: params.phone,
        },
      }),
    );
    const order = result.makeOrder;
    this.client.storage.setJson(this.ORDER_KEY, order);
    return result.makeOrder as OrderOutput;
  }

  async update(id: string, params: CreateOrderArgs) {
    const result = await this.client.wrap(
      this.client.api.patchOrder({
        orderId: id,
        metadata: {
          direction: params.direction,
          payment: params.payment,
          phone: params.phone,
        },
      }),
    );
    const order = result.makeOrder;
    this.client.storage.setJson(this.ORDER_KEY, order);
    return order;
  }
  async addLine(line: CreateLineArgs) {
    const order = this.client.storage.getJson<Order>(this.ORDER_KEY);
    const result = await this.client.wrap(
      this.client.api.patchOrderLine({
        orderId: order.id,
        orderLine: line,
      }),
    );
    if (result?.patchOrderLine) {
      this.client.storage.setJson(this.ORDER_KEY, result.patchOrderLine);
    }
    return result.patchOrderLine;
  }
  async updateLine(id: string, line: CreateLineArgs) {
    const order = this.client.storage.getJson<Order>(this.ORDER_KEY);
    const result = await this.client.wrap(
      this.client.api.patchOrderLine({
        orderId: order.id,
        orderLine: line,
        orderLineId: id,
      }),
    );
    if (result?.patchOrderLine) {
      this.client.storage.setJson(this.ORDER_KEY, result.patchOrderLine);
    }
    return result?.patchOrderLine;
  }

  async deleteLine(id: string) {
    const order = this.client.storage.getJson<Order>(this.ORDER_KEY);
    const result = await this.client.wrap(
      this.client.api.deleteOrderLine({
        lineOrderId: id,
        orderId: order.id,
      }),
    );
    if (result?.customDeleteOrderLine) {
      this.client.storage.setJson(this.ORDER_KEY, result.customDeleteOrderLine);
    }
    return result?.customDeleteOrderLine;
  }
}

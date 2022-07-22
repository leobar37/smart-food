import {
  OrderOutput,
  PatchOrderLineMutationVariables,
  PatchOrderMutationVariables,
} from '../generated';
import { Feature } from './base';

type CreateOrderArgs = {} & PatchOrderMutationVariables['metadata'];

export type CreateLineArgs = Omit<
  PatchOrderLineMutationVariables['orderLine'],
  'selection'
>;

export class OrderHandler extends Feature {
  ORDER_KEY = 'CURRENT_ORDER';
  ORDER_ID_KEY = 'CURRENT_ORDER_ID';

  async get() {
    const prevOrderId = this.client.storage.get(this.ORDER_KEY);

    if (!prevOrderId) {
      return;
    }

    const orderResult = await this.client.wrap(
      this.client.api.getOrder({ id: prevOrderId }),
    );

    const order = orderResult.order;

    this.client.storage.set(this.ORDER_ID_KEY, order?.id);
    this.client.storage.setJson(this.ORDER_KEY, order);

    return order;
  }

  async getOrderLinesCount() {
    const currentOrderId = this.client.storage.get(this.ORDER_ID_KEY);

    const currentOrder = this.client.storage.getJson<OrderOutput>(
      this.ORDER_KEY,
    );

    const orderId = currentOrderId ?? currentOrder?.id;

    if (!orderId) {
      return;
    }

    const orderWithLineCount = await this.client.wrap(
      this.client.api.getOrderLineCount({
        id: orderId,
      }),
    );

    const order = {
      ...currentOrder,
      ...orderWithLineCount.order,
    };

    this.client.storage.set(this.ORDER_ID_KEY, order?.id);
    this.client.storage.setJson(this.ORDER_KEY, order);

    return order;
  }

  /**
   *  TODO: the email si not implemented for now because we do not yet handle the customer as an entity
   */
  async create(params?: CreateOrderArgs) {
    const result = await this.client.wrap(
      this.client.api.patchOrder({
        metadata: {
          direction: params?.direction,
          payment: params?.payment,
          phone: params?.phone,
        },
      }),
    );

    const order = result.makeOrder;

    this.client.storage.set(this.ORDER_ID_KEY, order.id);
    this.client.storage.setJson(this.ORDER_KEY, order);

    return order;
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

    this.client.storage.set(this.ORDER_ID_KEY, order.id);
    this.client.storage.setJson(this.ORDER_KEY, order);

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
      }),
    );

    if (result?.patchOrderLine) {
      this.client.storage.setJson(this.ORDER_KEY, result.patchOrderLine);
    }

    return result.patchOrderLine;
  }

  async updateLine(id: string, line: CreateLineArgs) {
    const orderId = this.client.storage.get(this.ORDER_ID_KEY);

    if (!orderId) {
      return;
    }

    const result = await this.client.wrap(
      this.client.api.patchOrderLine({
        orderId: orderId,
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
      this.client.storage.setJson(this.ORDER_KEY, result.customDeleteOrderLine);
    }

    return result?.customDeleteOrderLine;
  }
}

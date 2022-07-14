import { Feature } from './base';
import { PatchOrderMutationVariables, OrderOutput } from '../generated';
type CreateOrderArgs = {
  orderId: PatchOrderMutationVariables['orderId'];
} & PatchOrderMutationVariables['metadata'];

export class OrderHandler extends Feature {
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
    return result.makeOrder as OrderOutput;
  }
  update() {
    // TODO: implement this method
  }
}

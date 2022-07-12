import { ClientV2 } from '../client';
import { Product } from '../generated';
export class Products {
  client: ClientV2;
  constructor(client: ClientV2) {
    this.client = client;
  }

  async list({
    relations = [],
  }: {
    relations?: 'products'[];
  }): Promise<Product[]> {
    const result = await this.client.wrap(
      this.client.api.getProducts({
        includeOptions: relations.includes('products'),
      }),
    );
    return result.products as Product[];
  }
}

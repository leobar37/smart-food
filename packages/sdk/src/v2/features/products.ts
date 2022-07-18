import { Product } from '../generated';
import { Feature } from './base';
import { ProductRelation } from '../types';

export class Products extends Feature {
  async list({
    relations = [],
  }: {
    relations?: ProductRelation[];
  }): Promise<Product[]> {
    const result = await this.client.wrap(
      this.client.api.getProducts({
        includeOptions: relations.includes('products'),
      }),
    );
    return result.products as Product[];
  }

  async get(id: string) {
    const result = await this.client.wrap(
      this.client.api.getProduct({
        includeOptions: true,
        id: id,
      }),
    );

    return result.product;
  }
}

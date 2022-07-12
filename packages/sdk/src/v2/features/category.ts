import { ClientV2 } from '../client';
import { Category } from '../generated';

export class Categories {
  client: ClientV2;
  constructor(client: ClientV2) {
    this.client = client;
  }

  async list(options?: { relations: 'products'[] }): Promise<Category[]> {
    const { relations = [] } = options;
    const result = await this.client.wrap(
      this.client.api.getCategories({
        includeProducts: relations.includes('products'),
      }),
    );
    return result.categories;
  }
}

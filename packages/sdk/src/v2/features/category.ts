import { Category } from '../generated';
import { Feature } from './base';
export class Categories extends Feature {
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

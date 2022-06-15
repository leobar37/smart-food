import { GraphQLClient } from 'graphql-request';
import {
  buildGetProductsDocument,
  buildGetCategoriesDocument,
  GetProductsParams,
} from './graphql';
import { GraphQLError } from 'graphql';
import { Product, Category } from './types';
import get from 'lodash.get';
import { SmartClientError } from './error';

type ClientOptions = {
  endpoint: string;
};

const formatError = (data: any) => {
  if ('errors' in data) {
    const errors: GraphQLError[] = Array.isArray(data?.errors)
      ? data.errors
      : [data.errors];
    const message = errors.map((error) => error?.message ?? '').join('\n');
    throw new SmartClientError(message);
  }
};

export class Client {
  client: GraphQLClient;
  constructor(options: ClientOptions) {
    this.client = new GraphQLClient(options.endpoint, {
      errorPolicy: 'all',
    });
  }
  async getProducts(params: GetProductsParams): Promise<Product[]> {
    const data = await this.client.rawRequest(buildGetProductsDocument(params));
    formatError(data);
    return get(data, 'data.products', []);
  }

  async getCategories(): Promise<Category[]> {
    const data = await this.client.rawRequest(buildGetCategoriesDocument());
    formatError(data);
    return get(data, 'data.categories', []);
  }
  async createOrder() {}
  async createClient() {}
}

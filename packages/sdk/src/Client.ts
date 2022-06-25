import { GraphQLError } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import get from 'lodash.get';
import { SmartClientError } from './error';
import {
  buildDeleteOrderLineDocument,
  buildGetCategoriesDocument,
  buildGetOrderDocument,
  buildGetProductsDocument,
  buildgetSubOptionsDocument,
  buildOrderLineDocument,
  CreateOrderArgs,
  DeleteOrderLineArgs,
  GetProductsParams,
  GetSubOptionsParams,
  Order,
  PatchOrderLineArgs,
} from './graphql';
import { Category, Product } from './types';

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
  async patchOrder(args?: CreateOrderArgs): Promise<Order> {
    const data = await this.client.rawRequest(
      buildGetOrderDocument('create'),
      args,
    );
    formatError(data);
    return get(data, 'data.makeOrder', {});
  }

  async patchOrderLine(args: PatchOrderLineArgs) {
    const data = await this.client.rawRequest(buildOrderLineDocument(), args);
    formatError(data);
    return get(data, 'data.patchOrderLine', {});
  }
  async deleteOrderLine(args: DeleteOrderLineArgs) {
    const data = await this.client.rawRequest(
      buildDeleteOrderLineDocument(),
      args,
    );
    formatError(data);
    return get(data, 'data.customDeleteOrderLine', {});
  }
  async getSubOptions(args: GetSubOptionsParams) {
    const data = await this.client.rawRequest(
      buildgetSubOptionsDocument(),
      args,
    );
    formatError(data);
    return get(data, 'data.subOptions', []);
  }
}

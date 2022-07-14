import { GraphQLClient } from 'graphql-request';
import { rawRequest } from 'graphql-request';
import { getSdk } from './generated';
import { Products, Categories, OrderHandler } from './features';
import { Storage } from './storage/storage.strategy';
import { BrowserStorage } from './storage/defaultStorage';
type ClientOptions = {
  endpoint: string;
  storage?: Storage;
};
export class ClientV2 {
  client: GraphQLClient;
  api: ReturnType<typeof getSdk>;
  products: Products;
  categories: Categories;
  order: OrderHandler;
  storage: Storage;
  constructor(options: ClientOptions) {
    this.client = new GraphQLClient(options.endpoint, {
      errorPolicy: 'all',
    });
    if (options?.storage) {
      this.storage = options.storage;
    } else {
      this.storage = new BrowserStorage();
    }
    this.api = getSdk(this.client);
    this.products = new Products(this);
    this.categories = new Categories(this);
    this.order = new OrderHandler(this);
  }
  // prettier-ignore
  async wrap<T>(fun: ReturnType<typeof rawRequest<T>>) {
    const result = await fun;
    // TODO: Format the error here
    return result.data as T;
  }
}

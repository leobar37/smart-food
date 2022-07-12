import { GraphQLClient } from 'graphql-request';
import { rawRequest } from 'graphql-request';
import { getSdk } from './generated';
import { Products, Categories } from './features';

type ClientOptions = {
  endpoint: string;
};
export class ClientV2 {
  client: GraphQLClient;
  api: ReturnType<typeof getSdk>;
  products: Products;
  categories: Categories;
  constructor(options: ClientOptions) {
    this.client = new GraphQLClient(options.endpoint, {
      errorPolicy: 'all',
    });
    this.api = getSdk(this.client);
    this.products = new Products(this);
    this.categories = new Categories(this);
  }
  // prettier-ignore
  async wrap<T>(fun: ReturnType<typeof rawRequest<T>>) {
    const result = await fun;
    // TODO: Format the error here
    return result.data as T;
  }
}
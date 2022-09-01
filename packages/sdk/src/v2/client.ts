import { GraphQLClient } from 'graphql-request';
import { rawRequest } from 'graphql-request';
import { getSdk } from './generated';
import { Products, Categories, OrderHandler } from './features';
import { Storage } from './storage/storage.strategy';
import { BrowserStorage } from './storage/defaultStorage';
import { get, has } from 'lodash';

export enum ERROR_CODES {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

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
    return new Promise(async (resolve, reject) => {
      const result = await fun;
      const errors =  get(result , "errors");
      if(has(result , "errors") &&  (errors as []).length > 0 ) {
        const formatedErrors =  get(result , "errors" , []).map((gross : any) =>  {
            return {
                 code : get(gross , "extensions.code", ERROR_CODES.INTERNAL_SERVER_ERROR) as ERROR_CODES,
                 message : get(gross , "message" )
                } 
          });
        reject(formatedErrors)
        return;
      }
      resolve(result.data)
      return result.data as T;
    })as Promise<T>
  }
}

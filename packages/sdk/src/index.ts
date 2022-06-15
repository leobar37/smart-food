import { GraphQLClient } from 'graphql-request';

type ClientOptions = {
  url: string;
};

export class Client {
  client: GraphQLClient;
  constructor(options: ClientOptions) {
    
  }
}

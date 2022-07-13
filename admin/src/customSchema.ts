import { GraphQLSchema } from 'graphql';
import { orderExtendGraphql } from './modules/order';

export const extendGraphqlSchema = (keystoneSchema: GraphQLSchema) => {
  return orderExtendGraphql(keystoneSchema);
};

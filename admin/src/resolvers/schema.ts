import { GraphQLSchema} from 'graphql'
import  {orderExtendGraphql} from './order';

export const extendGraphqlSchema = (keystoneSchema : GraphQLSchema) => {
  return  orderExtendGraphql(keystoneSchema);
}




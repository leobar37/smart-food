import { graphql } from '@keystone-6/core';
import { getMutations, getQueries } from './resolvers';

export const orderExtendGraphql = graphql.extend((base) => {
  const { makeOrder, patchOrderLine, deleteOrderLine } = getMutations(base);
  const { getOrder } = getQueries(base);
  return {
    mutation: {
      makeOrder: makeOrder,
      patchOrderLine: patchOrderLine,
      customDeleteOrderLine: deleteOrderLine,
    },
    query: {
      ecoOrder: getOrder,
    },
  };
});

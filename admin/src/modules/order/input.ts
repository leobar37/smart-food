import { BaseSchemaMeta } from '@graphql-ts/extend';
import { graphql } from '@keystone-6/core';
import { memoize } from 'lodash';
export const getInputs = memoize((base: BaseSchemaMeta) => {
  /**
   * OrderLineItem
   */
  const OrderLineItem = graphql.inputObject({
    name: 'OrderLineItem',
    fields: {
      productId: graphql.arg({
        type: graphql.String,
      }),
      quantity: graphql.arg({
        type: graphql.Int,
      }),
      price: graphql.arg({
        type: graphql.Float,
      }),
      selection: graphql.arg({
        type: graphql.JSON,
        description: `
        metadata about this line
        options : {
           id  : string,
           options  : string[]
         }
        `,
      }),
    },
  });

  return {
    OrderLineItem,
  };
});

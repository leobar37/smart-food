import { BaseSchemaMeta } from '@graphql-ts/extend';
import { graphql } from '@keystone-6/core';
import { memoize } from 'lodash';
export type OrderOutput = {
  id: string;
  orderNumber: number;
  createdAt: Date;
  status: string;
  linesCount: number;
  total: string;
  lines: {
    id: string;
    selection: any;
    quantity: number;
  };
  deliveryDetails: any;
  metadata: null;
};

export type OderLineOutput = {
  id: string;
  productId: string;
  orderId: string;
  selection: any;
  quantity: number;
};
export const getOutputs = memoize((base: BaseSchemaMeta) => {
  const OrderLine = graphql.object<OderLineOutput>()({
    fields: {
      id: graphql.field({
        type: graphql.String,
      }),
      productId: graphql.field({
        type: graphql.String,
      }),
      orderId: graphql.field({
        type: graphql.String,
      }),
      price: graphql.field({
        type: graphql.Float,
      } as any),
      total: graphql.field({
        type: graphql.Float,
      } as any),
      selection: graphql.field({
        type: graphql.JSON,
      }),
      quantity: graphql.field({
        type: graphql.Int,
      }),
    },
    name: 'OrderLineOutput',
  });

  const OrderOutput = graphql.object<OrderOutput>()({
    name: 'OrderOutput',
    fields: {
      id: graphql.field({
        type: graphql.String,
      }),
      orderNumber: graphql.field({
        type: graphql.Int,
      }),
      createdAt: graphql.field({
        type: graphql.DateTime,
      }),
      status: graphql.field({
        type: base.enum('OrderStatusType'),
      }),
      linesCount: graphql.field({
        type: graphql.Int,
      }),
      paymentMethod: graphql.field({
        type: base.enum('OrderPaymentMethodType'),
      } as any),
      metadata: graphql.field({
        type: graphql.JSON,
      }),
      total: graphql.field({
        type: graphql.Float,
      } as any),
      lines: graphql.field({
        type: graphql.list(OrderLine),
      } as any),
    },
  });

  return {
    OrderLine,
    OrderOutput,
  };
});

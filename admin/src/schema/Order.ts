import { list, graphql } from '@keystone-6/core';
import {
  float,
  integer,
  json,
  relationship,
  select,
  timestamp,
  virtual,
} from '@keystone-6/core/fields';
import { OrderEnum, ORDER_STATUS } from '../constants';
import { PAYMENT_METHODS } from '@smartfood/common';

export const Order = list({
  graphql: {
    // omit: ['create', 'delete', 'update', 'query'],
  },
  description : "The order",
 
  ui: {
    hideCreate: true,
  
    labelField: 'orderNumber',
    listView: {
      initialColumns: ['client', 'orderNumber', 'status', 'createdAt'],
      initialSort: {
        field: 'status',
        direction: 'ASC',
      },
    },
  },
  access: {
    // operation : {
    //   create : () => false,
    //   delete : () => false,
    //   update :() => false,
    //   query : () => false
    // }
  },
  fields: {
    orderNumber: integer({
      label: 'Número de orden',
      db: {
        isNullable: false,
      },
      ui: {
        itemView: {
          fieldMode: 'read',
        },
        createView: {
          fieldMode: 'edit',
        },
      },
      defaultValue: {
        kind: 'autoincrement',
      },
    }),
    createdAt: timestamp({
      defaultValue: {
        kind: 'now',
      },
      ui: {
        itemView: {
          fieldMode: 'read',
        },
      },
    }),
    status: select({
      type: 'enum',
      options: ORDER_STATUS,
      defaultValue: OrderEnum.IN_CART,
      ui: {
        displayMode: 'select',
      },
    }),
    lines: relationship({
      label: 'Detalles',
      ref: 'OrderLine.order',
      many: true,
      ui: {
        views: require.resolve('../components/order/LineDetails'),
      },
    }),
    // total: virtual({
    //   field: graphql.field({
    //     type: graphql.String,
    //     resolve: (item) => {
    //       console.log(item);
    //       return 10 as any;
    //     },
    //   }),
    // }),
    client: relationship({
      ref: 'Client.orders',
      many: false,
      ui: {
        itemView: {
          fieldMode: 'hidden',
        },
      },
    }),
    metadata: json({
      defaultValue: {},
      ui: {
        itemView: {
          fieldMode: 'hidden',
        },
      },
    }),
    deliveryDetails: virtual({
      field: graphql.field({
        type: graphql.JSON,
        resolve: (root) => {
          const { metadata } = root as any;
          return {
            metadata: metadata,
          };
        },
      }),
      ui: {
        views: require.resolve('../components/order/DeliveryDetails.tsx'),
      },
    }),
    paymentMethod: select({
      type: 'enum',
      options: PAYMENT_METHODS,
      ui: {
        displayMode: 'select',
      },
    }),
  },
});

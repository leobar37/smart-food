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
import { OrderEnum, ORDER_STATUS, PAYMENT_METHODS } from '../constants';
import { get } from 'lodash';

export const Order = list({
  ui: {
    labelField: 'orderNumber',
    listView: {
      initialColumns: ['client', 'orderNumber', 'status'],
    },
  },
  access : {
      // operation : {
      //   create : () => false,
      //   delete : () => false,
      //   update :() => false,
      //   query : () => false
      // }
  },
  fields: {
    orderNumber: integer({
      label : "Número de orden",
      db: {
        isNullable: false,
      },
      ui: {
        itemView: {
          fieldMode: 'read',
        },
        createView : {
          fieldMode : "edit"
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
    }),
    status: select({
      type: 'enum',
      options: ORDER_STATUS,
      defaultValue: OrderEnum.PENDING,
      ui: {
        displayMode: 'select',
      },
    }),
    lines: relationship({
      label: 'Detalles',
      ref: 'OrderLine.order',
      many: true,
      ui: {
        views :  require.resolve("../components/order/LineDetail.tsx")
       },
    }),
    total: float(),
    client: relationship({ ref: 'Client.orders', many: false }),
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
            direction: get(metadata, 'direction'),
            phone: get(metadata, 'phone'),
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

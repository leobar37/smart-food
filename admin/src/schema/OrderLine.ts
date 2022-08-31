import { graphql, list } from '@keystone-6/core';
import {
  float,
  integer,
  json,
  relationship,
  virtual,
  timestamp,
} from '@keystone-6/core/fields';
import { PrismaClient } from '@prisma/client';
import { get } from 'lodash';
export const OrderLine = list({
  fields: {
    order: relationship({
      ref: 'Order.lines',
      many: false,
      ui: {
        displayMode: 'cards',
        cardFields: ['orderNumber', 'status'],
        removeMode: 'none',
      },
    }),
    product: relationship({
      ref: 'Product',
      many: false,
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'category', 'price'],
        removeMode: 'none',
      },
    }),
    createdAt: timestamp(),
    quantity: integer(),
    price: float(),
    total: float(),
    selection: json({
      ui: {
        itemView: {
          fieldMode: 'hidden',
        },
        listView: {
          fieldMode: 'hidden',
        },
      },
      defaultValue: {},
    }),
    results: virtual({
      label: 'Resultados',
      ui: {
        views: require.resolve('../components/ShowSubOptions.tsx'),
      },
      field: graphql.field({
        type: graphql.JSON,
        resolve: async (root, _, context) => {
          return get(root, 'selection.options', []);
        },
      }),
    }),
  },
});

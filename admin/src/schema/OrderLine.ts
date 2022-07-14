import { graphql, list } from '@keystone-6/core';
import {
  float,
  integer,
  json,
  relationship,
  virtual,
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
          const prisma = context.prisma as PrismaClient;
          const selection = get(root, 'selection.options', []) as {
            id: string;
          }[];
          const result = selection.map(async (option) => {
            const parent = await prisma.option.findFirst({
              where: {
                id: {
                  equals: option.id,
                },
              },
            });
            const subSelectionPromises = (get(option, 'options', []) as []).map(
              (id) =>
                prisma.subOption.findFirst({
                  where: {
                    id: {
                      equals: id,
                    },
                  },
                }),
            );
            const subOptions = await Promise.all(subSelectionPromises);
            return {
              option: parent,
              subOptions: subOptions,
            };
          });

          return Promise.all(result);
        },
      }),
    }),
  },
});

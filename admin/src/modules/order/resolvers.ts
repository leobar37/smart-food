import { BaseSchemaMeta } from '@graphql-ts/extend';
import { graphql } from '@keystone-6/core';
import {
  Client,
  OrderLine,
  OrderStatusType,
  PrismaClient,
  Product,
} from '@prisma/client';
import { OrderMetadata, PATCH_ORDERLINE_COMMANDS } from '@smartfood/common';
import { get, isNil, merge, omitBy } from 'lodash';
import { getInputs } from './input';
import * as orderService from './order.service';
import { getOutputs } from './output';
import { resolveLineProductSelection } from './order.service';
export const getMutations = (base: BaseSchemaMeta) => {
  const { OrderLineItem } = getInputs(base);
  const { OrderOutput } = getOutputs(base);

  /**
   * Make order
   */
  const makeOrder = graphql.field({
    type: OrderOutput,
    description: 'You can create a edit a order with this mutation',
    args: {
      email: graphql.arg({
        type: graphql.String,
        description:
          'If the email is sent, the user will be searched for and affiliated to the order',
      }),
      metadata: graphql.arg({
        description: `
         The delivery data should be linked  to a client, but this functionality
         is not avalaible in the firt version, for now it saved as a json.
        `,
        type: graphql.JSON,
      }),
      paymentMethod: graphql.arg({
        type: base.enum('OrderPaymentMethodType'),
      }),
      orderId: graphql.arg({
        type: graphql.String,
        description: 'If this field is passed the order will be edited',
      }),
    },
    resolve: async (source, args, context) => {
      const prisma = context.prisma as PrismaClient;
      const metatada = args.metadata as any as OrderMetadata;
      let client: Client | undefined;

      if (args?.email) {
        client = await prisma.client.findFirst({
          where: {
            email: {
              contains: args?.email,
            },
          },
        });
      }

      if (args?.orderId) {
        const pendingStatus = get(metatada, 'deliveryDetails.name', false);
        const order = await prisma.order.findUnique({
          where: {
            id: args.orderId,
          },
        });
        const result = await prisma.order.update({
          where: {
            id: args.orderId,
          },
          data: merge(
            order,
            omitBy(
              {
                metadata: omitBy(metatada, isNil) ?? {},
                paymentMethod: args?.paymentMethod,
                status: pendingStatus
                  ? OrderStatusType.PENDING
                  : OrderStatusType.IN_CART,
              },
              isNil,
            ),
          ),
          include: {
            lines: true,
          },
        });

        return {
          ...result,
          linesCount: result?.lines?.length ?? 0,
          total: (result as any)?.total ?? 0,
          lines: result?.lines ?? [],
        } as any;
      } else {
        const orderCreted = await prisma.order.create({
          data: omitBy(
            {
              clientId: client?.id,
              metadata: omitBy(metatada, isNil) ?? {},
              status: OrderStatusType.IN_CART,
              paymentMethod: args?.paymentMethod,
            },
            isNil,
          ),
          include: {
            lines: {
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        });
        return orderCreted;
      }
    },
  });

  /**
   * Patch Order Line
   */
  const patchOrderLine = graphql.field({
    type: OrderOutput,
    description:
      'A line describes the relationship between the and the product',
    args: {
      orderId: graphql.arg({
        type: graphql.String,
      }),
      orderLineId: graphql.arg({
        type: graphql.String,
        description:
          'If this field is sent, the order will be searched for and edited',
      }),
      orderLine: graphql.arg({
        type: OrderLineItem,
      }),
      command: graphql.arg({
        type: graphql.String,
        description: `
          In order to agilize the process,
          you will send commands with the respective
          action you wish to todo
          commmands:
          =========
          UPDATE_QUANTITY: The backend only updates the quantity
          UPDATE_LINE: this is util when a line is updated, as t 
          may cause some dowtime
        `,
      }),
    },
    resolve: async (root, args, context) => {
      const prisma = context.prisma as PrismaClient;
      const isUpdateLineCommand =
        args.command === PATCH_ORDERLINE_COMMANDS.update_line;

        console.log("patch order line");
        
      const lineFound = args?.orderLineId
        ? await prisma.orderLine.findFirst({
            where: {
              id: args?.orderLineId,
            },
            include: {
              product: true,
            },
          })
        : null;

      const updateLine = async (
        orderLine: OrderLine & { product: Product },
      ) => {
        /*
          by convention, when the user wants to overwrite the quantity
          he , must send the id as argument
        */
        const quantity = args.orderLine.quantity;
        const product = orderLine.product;
        const isZero = quantity === 0;
        if (isZero) {
          await prisma.orderLine.delete({
            where: {
              id: orderLine.id,
            },
          });
          return null;
        }
        // analyse selection when teh intention is update this
        const optionsTransformed = isUpdateLineCommand
          ? await resolveLineProductSelection(args.orderLine.selection, prisma)
          : [];
        if (!isZero) {
          return await prisma.orderLine.update({
            where: {
              id: orderLine.id,
            },
            data: {
              quantity: quantity,
              ...(isUpdateLineCommand
                ? {
                    selection: {
                      options: optionsTransformed!,
                    },
                  }
                : {}),
              price: product.price,
              total: product.price * quantity,
            },
          });
        }
      };

      const createLine = async () => {
        const product = await prisma.product.findUnique({
          where: {
            id: args.orderLine.productId,
          },
        });

        const optionsTransformed = isUpdateLineCommand
          ? await resolveLineProductSelection(args.orderLine.selection, prisma)
          : [];

        const orderLine = await prisma.orderLine.create({
          data: {
            createdAt: new Date(),
            orderId: args.orderId,
            productId: args.orderLine.productId,
            quantity: args.orderLine.quantity,
            ...(isUpdateLineCommand
              ? {
                  selection: {
                    options: optionsTransformed!,
                  },
                }
              : {}),
            price: product.price,
            total: product.price * args.orderLine.quantity,
          },
        });

        console.log('create line');
        console.log({
          product,
          orderLine,
        });

        return orderLine;
      };
      if (lineFound) {
        console.log('line found', lineFound);

        await updateLine(lineFound);
      } else {
        await createLine();
      }
      return orderService.findOrder(prisma, args.orderId);
    },
  });

  /**
   * Delete Order line
   */

  const deleteOrderLine = graphql.field({
    type: OrderOutput,
    args: {
      orderId: graphql.arg({
        type: graphql.String,
      }),
      lineOrderId: graphql.arg({
        type: graphql.String,
      }),
    },
    resolve: async (_, { orderId, lineOrderId }, context) => {
      const prisma = context.prisma as PrismaClient;
      await prisma.orderLine.delete({
        where: {
          id: lineOrderId,
        },
      });
      return orderService.findOrder(prisma, orderId);
    },
  });
  return {
    makeOrder,
    patchOrderLine,
    deleteOrderLine,
  };
};

export const getQueries = (base: BaseSchemaMeta) => {
  const { OrderOutput } = getOutputs(base);

  const getOrder = graphql.field({
    type: OrderOutput,
    description:
      'This a order is a bit different of original order, generated by keystone JS',
    args: {
      orderId: graphql.arg({
        type: graphql.String,
      }),
    },
    resolve: async (root, args, ctx) => {
      const prisma = ctx.prisma as PrismaClient;
      return orderService.findOrder(prisma, args.orderId);
    },
  });
  return {
    getOrder,
  };
};

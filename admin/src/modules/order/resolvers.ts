import { BaseSchemaMeta } from '@graphql-ts/extend';
import { graphql } from '@keystone-6/core';
import {
  Client,
  OrderLine,
  OrderPaymentMethodType,
  OrderStatusType,
  PrismaClient,
  Product,
} from '@prisma/client';
import { isNil, merge, omitBy } from 'lodash';
import { getInputs } from './input';
import * as orderService from './order.service';
import { getOutputs } from './output';
export const getMutations = (base: BaseSchemaMeta) => {
  const { metadata, OrderLineItem } = getInputs(base);
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
        type: metadata,
      }),
      orderId: graphql.arg({
        type: graphql.String,
        description: 'If this field is passed the order will be edited',
      }),
    },
    resolve: async (source, args, context) => {
      const prisma = context.prisma as PrismaClient;
      const metatada = {
        direction: args.metadata?.direction,
        phone: args.metadata?.phone,
      };

      let client: Client | undefined;
      if (args?.email) {
        client = await prisma.client.findFirst({
          where: {
            email: {
              contains: args.email,
            },
          },
        });
        if (!client) {
          throw new Error('This client not exist ');
        }
      }
      if (args?.orderId) {
        const order = await prisma.order.findFirst({
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
                metadata: omitBy(args.metadata, isNil) ?? {},
                paymentMethod: args?.metadata
                  ?.payment as OrderPaymentMethodType,
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
          total: result?.total ?? 0,
          lines: result?.lines ?? [],
        } as any;
      } else {
        const orderCreted = await prisma.order.create({
          data: omitBy(
            {
              clientId: client?.id,
              metadata: omitBy(metatada, isNil) ?? {},
              status: OrderStatusType.PENDING,
              paymentMethod: args?.metadata?.payment as OrderPaymentMethodType,
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
   *
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
    },
    resolve: async (root, args, context) => {
      const prisma = context.prisma as PrismaClient;
      const lineFound = await prisma.orderLine.findFirst({
        where: args?.orderLineId
          ? {
              id: args?.orderLineId,
            }
          : {
              productId: args.orderLine.productId,
            },
        include: {
          product: true,
        },
      });
      const updateLine = async (
        orderLine: OrderLine & { product: Product },
      ) => {
        /*
          by convention, whne the user wants to overwrite the quantity
          he , must send the id as argument
        */
        const quantity = args?.orderLineId
          ? args.orderLine.quantity
          : args.orderLine.quantity + orderLine.quantity;
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
        if (!isZero) {
          return await prisma.orderLine.update({
            where: {
              id: orderLine.id,
            },
            data: {
              quantity: quantity,
              selection: args.orderLine.selection,
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
          include: {
            options: {
              select: {
                id: true,
              },
            },
          },
        });
        return await prisma.orderLine.create({
          data: {
            createdAt: new Date(),
            orderId: args.orderId,
            productId: args.orderLine.productId,
            quantity: args.orderLine.quantity,
            selection: args.orderLine.selection,
            price: product.price,
            total: product.price * args.orderLine.quantity,
          },
        });
      };
      if (lineFound) {
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
      const order = await prisma.order.findFirst({
        where: {
          id: {
            equals: orderId,
          },
        },
      });
      if (!order) {
        throw new Error('Order not found');
      }
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

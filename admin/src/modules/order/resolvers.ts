import { BaseSchemaMeta } from '@graphql-ts/extend';
import { graphql } from '@keystone-6/core';
import {
  Client,
  OrderLine,
  OrderPaymentMethodType,
  OrderStatusType,
  PrismaClient,
} from '@prisma/client';
import { isNil, merge, omitBy } from 'lodash';
import { getInputs } from './input';
import { getOutputs } from './output';
export const getMutations = (base: BaseSchemaMeta) => {
  const { metadata, orderLineItem } = getInputs(base);
  const { OrderLine, OrderOutput } = getOutputs(base);

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
            lines: true,
          },
        });
        const result = await prisma.order.findUnique({
          where: {
            id: orderCreted.id,
          },
          include: {
            lines: true,
          },
        });

        return {
          ...result,
          linesCount: result?.lines?.length ?? 0,
          total: result.total ?? 0,
          lines: result?.lines ?? [],
        } as any;
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
        type: orderLineItem,
      }),
    },
    resolve: async (root, args, context) => {
      const prisma = context.prisma as PrismaClient;

      const order = await prisma.order.findFirst({
        where: {
          id: {
            equals: args.orderId,
          },
        },
        include: {
          lines: true,
        },
      });

      if (!order) {
        throw new Error('Order not found');
      }

      let orderLine: OrderLine | undefined;
      const lines = order.lines;

      if (args?.orderLineId) {
        orderLine = await prisma.orderLine.findFirst({
          where: {
            id: {
              equals: args.orderLineId,
            },
          },
        });
      }

      if (orderLine) {
        // update orderLine
        const product = await prisma.product.findFirst({
          where: {
            id: {
              equals: args.orderLine.productId,
            },
          },
        });

        orderLine = await prisma.orderLine.update({
          where: {
            id: args.orderLineId,
          },
          data: {
            productId: args.orderLine.productId,
            selection: args.orderLine.selection,
            quantity: args.orderLine.quantity,
            total: product.price * args.orderLine.quantity,
            orderId: args.orderId,
            price: args?.orderLine?.price ?? product.price,
          },
        });
        lines.filter((d) => (d.id === orderLine.id ? orderLine : d));
      } else {
        // create order line
        const product = await prisma.product.findFirst({
          where: {
            id: {
              equals: args.orderLine.productId,
            },
          },
        });

        orderLine = await prisma.orderLine.create({
          data: {
            productId: args.orderLine.productId,
            selection: args.orderLine.selection,
            quantity: args.orderLine.quantity,
            orderId: args.orderId,
            price: args?.orderLine?.price ?? product.price,
            total: product.price * args.orderLine.quantity,
          },
        });
        lines.push(orderLine);
      }

      const total = lines.reduce((acc, line) => {
        return acc + line.total;
      }, 0);

      // update order
      const orderUpdated = await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          total: total,
        },
        include: {
          lines: true,
        },
      });

      return {
        ...orderUpdated,
        linesCount: orderUpdated.lines.length,
      } as any;
    },
  });

  /**
   * Delete Order line
   */

  const deleteOrderLine = graphql.field({
    type: base.object('Order'),
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
      return prisma.order.findFirst({
        where: {
          id: {
            equals: orderId,
          },
        },
      });
    },
  });
  return {
    makeOrder,
    patchOrderLine,
    deleteOrderLine,
  };
};

export const getQueries = (base: BaseSchemaMeta) => {
  const getOrder = graphql.field({
    type: base.object('Order'),
    args: {
      orderId: graphql.arg({
        type: graphql.String,
      }),
    },
    resolve: (_, args, context) => {
      const prisma = context.prisma as PrismaClient;
      return prisma.order.findFirst({
        where: {
          id: {
            equals: args.orderId,
          },
        },
      });
    },
  });

  return {
    getOrder,
  };
};
/**
 * patch order line
 */

/**
 * Custom delete
 */

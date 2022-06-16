import { graphql } from '@keystone-6/core';
import {
  Client,
  OrderLine,
  OrderPaymentMethodType,
  OrderStatusType,
  PrismaClient,
} from '@prisma/client';
import { isNil, merge, omitBy } from 'lodash';
export const orderExtendGraphql = graphql.extend((base) => {
  const metadata = graphql.inputObject({
    name: 'Metadata',
    fields: {
      direction: graphql.arg({
        type: graphql.String,
      }),
      phone: graphql.arg({
        type: graphql.String,
      }),
      payment: graphql.arg({
        type: base.enum('OrderPaymentMethodType'),
      }),
    },
  });

  const orderLineItem = graphql.inputObject({
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
      total: graphql.arg({
        type: graphql.Float,
      }),
      selection: graphql.arg({
        type: graphql.JSON,
      }),
    },
  });

  return {
    mutation: {
      makeOrder: graphql.field({
        type: base.object('Order'),
        args: {
          email: graphql.arg({
            type: graphql.String,
          }),
          metadata: graphql.arg({
            type: metadata,
          }),
          orderId: graphql.arg({
            type: graphql.String,
          }),
        },
        resolve: async (source, args, context) => {
          const prisma = context.prisma as PrismaClient;
          const metatada = {
            direction: args.metadata?.direction,
            phone: args.metadata?.phone,
          };

          let client: Client | undefined;
          if (args.email) {
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
           return await prisma.order.update({
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
              include : {
                lines : true,
              }
            });
          } else {
            const orderCreted = await prisma.order.create({
              data: omitBy({
                clientId: client?.id,
                metadata: omitBy(metatada, isNil) ?? {},
                status: OrderStatusType.PENDING,
                paymentMethod: args?.metadata?.payment as OrderPaymentMethodType,
              }, isNil),
            });
            console.log('orderCreted', orderCreted);
            return orderCreted;
          }
        },
      }),
      patchOrderLine: graphql.field({
        type: base.object('Order'),
        args: {
          orderId: graphql.arg({
            type: graphql.String,
          }),
          orderLineId: graphql.arg({
            type: graphql.String,
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
                price: args.orderLine.price,
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
          return orderUpdated;
        },
      }),
      customDeleteOrderLine: graphql.field({
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
      }),
    },
    query: {
      customGetOrder: graphql.field({
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
      }),
    },
  };
});

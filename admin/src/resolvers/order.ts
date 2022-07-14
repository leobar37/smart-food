import { graphql } from '@keystone-6/core';
import {
  Client,
  OrderLine,
  OrderPaymentMethodType,
  OrderStatusType,
  PrismaClient,
} from '@prisma/client';
import { isNil, merge, omitBy } from 'lodash';
import second from '.';
export const orderExtendGraphql = graphql.extend((base) => {
  //** inputs
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

  //** outputs
  type OrderOutput = {
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
  const OrderLine = graphql.object<{
    id: string;
    productId: string;
    orderId: string;
    selection: any;
    quantity: number;
  }>()({
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
    mutation: {
      makeOrder: graphql.field({
        type: base.object('Order'),
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
              include: {
                lines: true,
              },
            });
          } else {
            const orderCreted = await prisma.order.create({
              data: omitBy(
                {
                  clientId: client?.id,
                  metadata: omitBy(metatada, isNil) ?? {},
                  status: OrderStatusType.PENDING,
                  paymentMethod: args?.metadata
                    ?.payment as OrderPaymentMethodType,
                },
                isNil,
              ),
              include: {
                lines: true,
              },
            });
            return prisma.order.findFirst({
              where: {
                id: {
                  equals: orderCreted.id,
                },
              },
            });
          }
        },
      }),
      patchOrderLine: graphql.field({
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
          console.log(orderUpdated);

          return {
            ...orderUpdated,
          } as any;
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

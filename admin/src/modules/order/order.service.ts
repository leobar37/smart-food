import { PrismaClient } from '@prisma/client';
import { OrderOutput } from './output';
export const findOrder = async (
  prisma: PrismaClient,
  orderId: string,
): Promise<OrderOutput> => {
  const orderResult = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      lines: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return {
    linesCount: orderResult.lines.length,
    ...orderResult,
  } as any;
};

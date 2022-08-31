import { PrismaClient } from '@prisma/client';
import { get } from 'lodash';
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

export const resolveLineProductSelection = async (
  selection: any,
  prisma: PrismaClient,
) => {
  const options = get(selection, 'options', []) as {
    id: string;
  }[];

  const promises = options.map(async (option) => {
    const parent = await prisma.option.findUnique({
      where: {
        id: option.id,
      },
    });
    const subSelectionPromises = (get(option, 'options', []) as []).map((id) =>
      prisma.subOption.findUnique({
        where: {
          id: id,
        },
      }),
    );
    const subOptions = await Promise.all(subSelectionPromises);
    return {
      option: parent,
      subOptions: subOptions,
    };
  });
  const results = Promise.all(promises);
  return results;
};

// export const patchOrderLine = () => {

// }

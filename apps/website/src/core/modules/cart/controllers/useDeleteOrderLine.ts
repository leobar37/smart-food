import cmsLib from '@App/core/lib/cms';
import { OrderOutput } from '@smartfood/client/v2';
import { useMutation, useQueryClient } from 'react-query';
import { DataUpdateFunction } from 'react-query/types/core/utils';
import { cacheKeys } from '@App/core/constants';

export const useDeleteOrderLine = () => {
  const client = useQueryClient();
  return useMutation(
    async (id: string) => {
      return cmsLib.order.deleteLine(id);
    },
    {
      onMutate: async (id: string) => {
        await client.cancelQueries(cacheKeys.order);
        const prevOrder = client.getQueryData(cacheKeys.order);
        client.setQueryData(cacheKeys.order, ((order: OrderOutput) => {
          return {
            ...order,
            linesCount: (order?.lines as unknown as number) - 1,
            lines: order.lines?.filter((d) => id !== d?.id),
          };
        }) as DataUpdateFunction<any, OrderOutput>);

        return {
          prevOrder,
        };
      },
      onError: (err, id, context) => {
        client.setQueryData(cacheKeys.order, context?.prevOrder);
      },
      onSuccess: async (data) => {
        client.setQueryData(cacheKeys.order, data);
      },
    },
  );
};

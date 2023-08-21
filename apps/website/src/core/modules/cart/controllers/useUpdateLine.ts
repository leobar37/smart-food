import cmsLib from '@App/core/lib/cms';
import { OrderOutput } from '@smartfood/client/v2';
import { clone, debounce } from 'lodash';
import { useMutation, useQueryClient } from 'react-query';
import { cacheKeys, mutationsKeys } from '@App/core/constants';
import { useMemo } from 'react';
import { DataUpdateFunction } from 'react-query/types/core/utils';
import { PATCH_ORDERLINE_COMMANDS } from '@smartfood/common';
export const useUpdateLine = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (params: { lineId: string; quantity: number; command?: string }) => {
      return cmsLib.order.updateLine(params.lineId, {
        quantity: params.quantity,
        command: params.command ?? PATCH_ORDERLINE_COMMANDS.update_quantity,
      });
    },
    {
      onMutate: async (params) => {
        await queryClient.cancelQueries(cacheKeys.order);
        const order = queryClient.getQueryData(cacheKeys.order) as OrderOutput;
        const snapShotOder = clone(order);
        if (order) {
          let lines = order.lines ?? [];
          const idxline = lines.findIndex((line) => line?.id === params.lineId);
          const line = lines[idxline];
          if (line) {
            line.quantity = params.quantity;
          }
          if (line?.quantity === 0) {
            lines = lines.filter((line) => line?.id !== params.lineId);
          } else {
            lines.splice(idxline, 1, line);
          }
          order.lines = lines;
          queryClient.setQueryData(cacheKeys.order, ((order: OrderOutput) => {
            return {
              ...order,
              lines: lines,
            };
          }) as DataUpdateFunction<any, OrderOutput>);
        }
        return {
          order: snapShotOder,
        };
      },
      mutationKey: mutationsKeys.updateLine,
      onSuccess: (data) => {
        // queryClient.setQueryData(cacheKeys.order, data);
      },
      onError: (...args) => {
        const context = args[2];
        queryClient.setQueryData(cacheKeys.order, context?.order);
      },
    },
  );
};

export const useDebounceUpdateLine = () => {
  const mutation = useUpdateLine();
  return useMemo(() => debounce(mutation.mutate, 600), [mutation.mutate]);
};

export const useUpdateOrderLineIsMutating = () => {
  const queryClient = useQueryClient();

  return (
    queryClient.isMutating({
      exact: true,
      mutationKey: mutationsKeys.updateLine,
    }) > 1
  );
};

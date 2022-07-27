import cmsLib from '@App/lib/cms';
import { OrderOutput } from '@smartfood/client/v2';
import { OptionSelection } from '@smartfood/common';
import { useAtomValue, useSetAtom } from 'jotai';
import { useMutation, useQueryClient } from 'react-query';
import { linesCountAtom } from '../../atoms/cartAtoms';
import { cacheKeys } from '../../constants';
import { useNotificationCart } from '../../hooks';

export const useAddToCart = () => {
  const client = useQueryClient();
  const setLinesCount = useSetAtom(linesCountAtom);
  const linesCount = useAtomValue(linesCountAtom);
  const notificationCart = useNotificationCart();

  return useMutation(
    async (params: {
      quantity: number;
      productId: string;
      selection?: { options: OptionSelection[] };
    }) => {
      notificationCart.open('loading');
      const order = await cmsLib.order.addLine({
        productId: params.productId,
        quantity: params.quantity,
        selection: params.selection ?? {},
      });
      await client.invalidateQueries(cacheKeys.order);
      return order;
    },
    {
      onMutate: async (params) => {
        await client.cancelQueries(cacheKeys.order);
        const order = client.getQueryData(cacheKeys.order) as OrderOutput;

        const linesCountSnapshot = linesCount;
        if (order) {
          const existInOrder = order.lines?.some(
            (line) => line?.productId === params.productId,
          );
          if (!existInOrder) {
            setLinesCount((prev) => prev + 1);
          }
        }
        return {
          linesCount: linesCountSnapshot,
        };
      },
      onSuccess: () => {
        notificationCart.open('success');
      },
      onError: (_, _variables, context) => {
        setLinesCount(context?.linesCount!);
      },
    },
  );
};

import cmsLib from '@App/lib/cms';
import { error } from '@chakra-ui/utils';
import { OrderOutput } from '@smartfood/client/v2';
import { OptionSelection } from '@smartfood/common';
import { useAtomValue, useSetAtom } from 'jotai';
import { clone } from 'lodash';
import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DataUpdateFunction } from 'react-query/types/core/utils';
import { linesCountAtom } from '../atoms/cartAtoms';
import { cacheKeys, PRODUCTS_FOR_BUILD_ID } from '../constants';
import { flatternCategories } from '../helpers';
import { useNotificationCart } from '../hooks';
import { useCategoriesWithProducts } from './products';

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
        notificationCart.open();
      },
      onError: (_, _variables, context) => {
        setLinesCount(context?.linesCount!);
      },
    },
  );
};

export const useUpdateLine = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (params: { lineId: string; quantity: number }) => {
      return cmsLib.order.updateLine(params.lineId, {
        quantity: params.quantity,
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
          queryClient.setQueryData(cacheKeys.order, () => {
            return {
              ...order,
              lines: order.lines,
            };
          });
        }
        return {
          order: snapShotOder,
        };
      },
      onSuccess: (data) => {
        queryClient.setQueryData(cacheKeys.order, data);
      },
      onError: (...args) => {
        const context = args[2];
        queryClient.setQueriesData(cacheKeys.order, context?.order);
      },
    },
  );
};

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

export const useOrder = () => {
  const setCountLines = useSetAtom(linesCountAtom);
  return useQuery(
    cacheKeys.order,
    async () => {
      const result = await cmsLib.order.get();
      return result;
    },
    {
      onSuccess: (data) => {
        const allIds = data?.lines?.map((d) => d?.productId);
        const uniquesIds = new Set(allIds);
        setCountLines(uniquesIds.size);
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  );
};

export const useDetailedOrder = () => {
  const orderQuery = useOrder();
  const { data: categoryProducts } = useCategoriesWithProducts();

  const result = useMemo(() => {
    if (!orderQuery?.data) {
      return null;
    }
    const allProducts = flatternCategories(categoryProducts ?? []);

    const lines = orderQuery.data?.lines ?? [];

    const newlines = lines.map((line) => ({
      ...line,
      product: allProducts.find((pr) => pr?.id === line?.productId) ?? null,
    }));

    orderQuery.data.lines = lines;

    const armedProducts = newlines.filter(
      (d) => d.product?.category.id === PRODUCTS_FOR_BUILD_ID,
    );

    const noArmedProducts = newlines.filter(
      (d) => d.product?.category.id !== PRODUCTS_FOR_BUILD_ID,
    );

    const totalPrice = (newlines ?? []).reduce((prev, line) => {
      error({
        condition: !line?.product,
        message: `${line.id} not contain a product`,
      });
      const price = line.quantity! * line.product?.price!;
      return prev + price;
    }, 0);

    return {
      armedProducts,
      noArmedProducts,
      order: orderQuery,
      totalPrice,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryProducts, orderQuery?.data]);

  return result;
};

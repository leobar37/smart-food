import cmsLib from '@App/lib/cms';
import { error } from '@chakra-ui/utils';
import { OrderOutput } from '@smartfood/client/v2';
import { useSetAtom } from 'jotai';
import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DataUpdateFunction } from 'react-query/types/core/utils';
import { linesCountAtom } from '../atoms/cartAtoms';
import { cacheKeys, PRODUCTS_FOR_BUILD_ID } from '../constants';
import { flatternCategories } from '../helpers';
import { useCategoriesWithProducts } from './products';

export const useAddToCart = () => {
  const client = useQueryClient();
  return useMutation(
    async (params: { quantity: number; productId: string }) => {
      const order = await cmsLib.order.addLine({
        productId: params.productId,
        quantity: params.quantity,
      });
      await client.invalidateQueries(cacheKeys.order);
      return order;
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
      onSettled: async () => {
        await client.invalidateQueries(cacheKeys.order);
      },
    },
  );
};
export const useOrder = () => {
  const setCountLines = useSetAtom(linesCountAtom);
  return useQuery(cacheKeys.order, async () => {
    const result = await cmsLib.order.get();
    setCountLines(result?.linesCount ?? 0);
    return result;
  });
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

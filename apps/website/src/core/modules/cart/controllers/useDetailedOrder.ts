import { error } from '@chakra-ui/utils';
import { useMemo } from 'react';
import { PRODUCTS_FOR_BUILD_ID } from '@App/core/constants';

import { flatternCategories } from '../../product/helpers';

import { useCategoriesWithProducts } from './../../product';

import { useOrder } from './useOrder';

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
      orderQuery: orderQuery,
      linesWithProduct: newlines,
      totalPrice,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryProducts, orderQuery?.data]);

  return result;
};

import React from 'react';
import { useUpdateAtom } from 'jotai/utils';
import { currentOrderAtom } from '../atoms/cartAtoms';
import cmsLib from '@App/lib/cms';
import { CreateLineArgs } from '@smartfood/client/src/v2/features';
import { Maybe, OrderOutput } from '@smartfood/client/v2';

// -[ ] add to cart
// -[ ] remove to cart
export const useCartControllerSetter = () => {
  const setOrder = useUpdateAtom(currentOrderAtom);

  const addToCart = React.useCallback(
    async (line: {
      quantity: number;
      productId: string;
      price?: Maybe<number>;
    }) => {
      if (!!!line.quantity) {
        return;
      }

      const order = await cmsLib.order.addLine(line);
      setOrder(order as OrderOutput);
    },
    [],
  );

  const removeToCart = React.useCallback(async (id: string) => {
    const order = await cmsLib.order.deleteLine(id);
    setOrder(order as OrderOutput);
  }, []);

  return {
    addToCart,
    removeToCart,
  };
};

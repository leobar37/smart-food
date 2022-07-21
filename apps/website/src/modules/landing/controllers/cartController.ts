// add to cart

import React from 'react';
import { useUpdateAtom } from 'jotai/utils';
import { currentOrderAtom } from '../atoms/cartAtoms';
import cmsLib from '@App/lib/cms';

// remove to cart
export const useCartControllerSetter = () => {
  const setOrder = useUpdateAtom(currentOrderAtom);

  const addToCart = React.useCallback((productId: string, count: number) => {
    cmsLib.order.addLine({});
  }, []);
};

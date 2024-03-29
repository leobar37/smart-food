import { useOrder } from './useOrder';
import { isNil } from 'lodash';
import { useMemo } from 'react';
export const useGetProductLine = (productId: string) => {
  const { data } = useOrder();

  const line = useMemo(() => {
    return data?.lines?.find((d) => d?.productId === productId);
  }, [data?.lines, productId]);
  
  return {
    isSelected: !isNil(line),
    line: line,
  };
};

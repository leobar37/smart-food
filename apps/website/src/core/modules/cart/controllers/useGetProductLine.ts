import { useOrder } from './useOrder';
import { isNil } from 'lodash';
export const useGetProductLine = (productId: string) => {
  const { data } = useOrder();
  if (!data) {
    return {
      isSelected: false,
      line: null,
    };
  }
  const line = data.lines?.find((d) => d?.productId === productId);

  return {
    isSelected: !isNil(line),
    line: line,
  };
};

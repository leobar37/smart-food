import { useBoolean } from '@chakra-ui/react';
import { createContext } from '@chakra-ui/react-utils';
import { LineItem } from './types';

interface ILinesOrderContext {
  orderLines?: LineItem[];
  isOpenDrawer: boolean;
  setIsOpenDrawer: ReturnType<typeof useBoolean>[1];
}
export const [Provider, useLinesContext] = createContext<ILinesOrderContext>({
  name: 'LinesOrderContext',
});

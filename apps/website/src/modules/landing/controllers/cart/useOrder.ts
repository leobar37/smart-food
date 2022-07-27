import cmsLib from '@App/lib/cms';
import { useSetAtom } from 'jotai';
import { useQuery } from 'react-query';
import { linesCountAtom } from '../../atoms/cartAtoms';
import { cacheKeys } from '../../constants';

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

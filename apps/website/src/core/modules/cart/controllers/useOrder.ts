import cmsLib from '@App/core/lib/cms';
import { useSetAtom } from 'jotai';
import { useQuery } from 'react-query';
import { linesCountAtom } from '../atoms';
import { cacheKeys } from '@App/core/constants';

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
        setCountLines(allIds?.length ?? 0);
      },
      onError: (err) => {
        // clean the storage, whe the order fail
        cmsLib.storage.clean();
      },
      retry : false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  );
};

import cmsLibs from '@App/lib/cms';
import { useQuery } from 'react-query';
import { cacheKeys } from '../constants';
export const useProducts = () => {
  return useQuery(
    cacheKeys.products,
    () =>
      cmsLibs.getProducts({
        responseType: 'product-only',
      }),
    {
      // this is prefetched in the server
      enabled: false,
    },
  );
};

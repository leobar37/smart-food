import cmsLib from '@App/lib/cms';
import { useQuery } from 'react-query';
import { cacheKeys } from '../constants';
export const useProducts = () => {
  return useQuery(cacheKeys.products, () => cmsLib.products.list({}), {
    // this is prefetched in the server
    enabled: false,
  });
};

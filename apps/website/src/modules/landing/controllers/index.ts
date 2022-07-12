import cmsLib from '@App/lib/cms';
import { useQuery } from 'react-query';
import { cacheKeys } from '../constants';
export const useCategoriesWithProducts = () => {
  return useQuery(
    cacheKeys.products,
    async () =>
      cmsLib.categories.list({
        relations: ['products'],
      }),
    {
      // this is prefetched in the server
      enabled: false,
    },
  );
};

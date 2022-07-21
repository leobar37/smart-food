import cmsLib from '@App/lib/cms';
import { Product } from '@smartfood/client/v2';
import { useAtomValue } from 'jotai';
import get from 'lodash.get';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { queryAtom } from '../atoms/SearchAtoms';
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

export const useProductsWithSearch = (): Product[] => {
  const { data: categoryProducts } = useCategoriesWithProducts();
  const query = useAtomValue(queryAtom);

  const buildChain = (pr: Product): string => {
    const value = get(pr, 'name') + get(pr, 'category.name');
    return (value as string).toLocaleLowerCase();
  };

  const products = useMemo(() => {
    const products = categoryProducts
      ?.map((ca) =>
        ca.products?.map((pr) => Object.assign(pr, { category: ca })),
      )
      .flat();
    if (query.length === 0) {
      return products;
    }
    const filteredProducts = products?.filter(
      (pr) => buildChain(pr!).indexOf(query.toLocaleLowerCase()) !== -1,
    );
    return filteredProducts ?? [];
  }, [query, categoryProducts]);

  return products as Product[];
};

export const useSingleProduct = (id: string) => {
  return useQuery([...cacheKeys.product, id], () => cmsLib.products.get(id), {
    enabled: false,
  });
};

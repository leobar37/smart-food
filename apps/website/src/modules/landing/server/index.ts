import { witHydration } from '@App/helpers/hydration';
import cmsClient from '@App/lib/cms';
import { GetServerSideProps } from 'next';
import { QueryClient } from 'react-query';
import { cacheKeys } from '../constants';

export const productsHandler: GetServerSideProps = async () => {
  const client = new QueryClient();
  await client.prefetchQuery(cacheKeys.products, () =>
    cmsClient.products.list({}),
  );
  return {
    props: witHydration(client)({}),
  };
};

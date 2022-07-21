import { witHydration } from '@App/helpers/hydration';
import cmsClient from '@App/lib/cms';
import { GetServerSideProps } from 'next';
import { QueryClient } from 'react-query';
import { cacheKeys } from '../constants';

export const homeHandler: GetServerSideProps = async () => {
  const client = new QueryClient();
  await client.prefetchQuery(cacheKeys.products, () =>
    cmsClient.categories.list({
      relations: ['products'],
    }),
  );
  return {
    props: witHydration(client)({}),
  };
};
export const menuHandler: GetServerSideProps = async () => {
  const client = new QueryClient();
  await client.prefetchQuery(cacheKeys.products, () =>
    cmsClient.categories.list({
      relations: ['products'],
    }),
  );
  return {
    props: witHydration(client)({}),
  };
};

export const armYourPlateHandler: GetServerSideProps = async () => {
  const client = new QueryClient();
  await client.prefetchQuery(cacheKeys.products, () =>
    cmsClient.categories.list({
      relations: ['products'],
    }),
  );
  return {
    props: witHydration(client)({}),
  };
};

export const buildPlateHandler: GetServerSideProps = async (context) => {
  const { id } = context?.params as { id: string };
  const client = new QueryClient();
  await client.prefetchQuery([...cacheKeys.product, id], () => {
    return cmsClient.products.get(id);
  });
  return {
    props: witHydration(client)({}),
  };
};

export const singleProductHandler: GetServerSideProps = async (context) => {
  const { id } = context?.params as { id: string };
  const client = new QueryClient();
  await client.prefetchQuery([...cacheKeys.product, id], () => {
    return cmsClient.products.get(id);
  });
  return {
    props: witHydration(client)({}),
  };
};

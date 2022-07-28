import { QueryClient, dehydrate } from 'react-query';
export const HYDRATION_KEY = 'dehydratedState';

export const witHydration =
  (client: QueryClient) =>
  ({ ...otherProps }: any) => ({
    [HYDRATION_KEY]: dehydrate(client),
    ...otherProps,
  });

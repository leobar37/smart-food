import { HYDRATION_KEY } from '@App/helpers/hydration';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@smartfood/ui';
import type { AppProps as NextAppProps } from 'next/app';
import { FC, ReactNode, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Global, css } from '@emotion/react';
const ConnectedApp: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

type AppProps = {
  pageProps: {
    dehydratedState: any;
  };
} & NextAppProps;

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps[HYDRATION_KEY]}>
        <ConnectedApp>
          <Component {...pageProps} />
          <Global
            styles={css`
              body {
                overflow-x: hidden;
              }
            `}
          />
        </ConnectedApp>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

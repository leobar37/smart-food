import { HYDRATION_KEY } from '@App/helpers/hydration';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@smartfood/ui';
import type { AppContext, AppProps as NextAppProps } from 'next/app';
import { FC, ReactNode, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Global, css } from '@emotion/react';
import App from 'next/app';
import verifyIsMobile from 'ismobilejs';
import { IsMobileContext } from '@App/helpers/isMobileContext';

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
  const { isMobile, ...props } = pageProps;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={props[HYDRATION_KEY]}>
        <IsMobileContext.Provider value={{ isMobile }}>
          <ConnectedApp>
            <Component {...props} />
            <Global
              styles={css`
                body {
                  overflow-x: hidden;
                }
              `}
            />
          </ConnectedApp>
        </IsMobileContext.Provider>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const req = appContext.ctx.req;

  const userAgent = req?.headers['user-agent'];
  const isMobile = verifyIsMobile(userAgent).any;

  return {
    pageProps: {
      ...appProps.pageProps,
      isMobile,
    },
  };
};

export default MyApp;

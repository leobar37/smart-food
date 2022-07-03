import { ChakraProvider } from '@chakra-ui/react';
import { theme, useBreakpintValue } from '@smartfood/ui';
import type { AppProps } from 'next/app';
import { FC, ReactElement, ReactNode } from 'react';
const ConnectedApp: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const breakpoint = useBreakpintValue();
  console.log(breakpoint);

  return children as ReactElement;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ConnectedApp>
        <Component {...pageProps} />
      </ConnectedApp>
    </ChakraProvider>
  );
}

export default MyApp;

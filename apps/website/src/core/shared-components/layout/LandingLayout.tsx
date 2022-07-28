import { Box, BoxProps } from '@chakra-ui/react';
import { NavBar } from '../navbar';
import { FC, ReactNode } from 'react';
import { LandingFooter } from '../footer';
import { useOrder } from '@App/core/modules/cart';

type LandingLayoutProps = {
  children: ReactNode;
} & BoxProps;
export const LandingLayout: FC<LandingLayoutProps> = ({
  children,
  ...props
}) => {
  useOrder();
  return (
    <Box mt="20" {...props}>
      <NavBar />
      {children}
      <LandingFooter />
    </Box>
  );
};

import { Box, BoxProps } from '@chakra-ui/react';
import { NavBar } from './shared/navbar';
import { FC, ReactNode } from 'react';
import { Footer } from './shared';
type LandingLayoutProps = {
  children: ReactNode;
} & BoxProps;
export const LandingLayout: FC<LandingLayoutProps> = ({
  children,
  ...props
}) => {
  return (
    <Box mt={'20'} {...props}>
      <NavBar />
      {children}
      <Footer />
    </Box>
  );
};

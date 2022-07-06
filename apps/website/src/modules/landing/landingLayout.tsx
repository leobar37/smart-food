import { Box } from '@chakra-ui/react';
import { NavBar } from './shared/navbar';
import { FC, ReactNode } from 'react';
import { Footer } from './shared';
type LandingLayoutProps = {
  children: ReactNode;
};
export const LandingLayout: FC<LandingLayoutProps> = ({ children }) => {
  return (
    <Box mt={'20'}>
      <NavBar />
      {children}
      <Footer />
    </Box>
  );
};

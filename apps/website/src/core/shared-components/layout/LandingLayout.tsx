import { Box, BoxProps } from '@chakra-ui/react';
import { NavBar } from '../navbar';
import { FC, Fragment, ReactNode } from 'react';
import { LandingFooter } from '../footer';
import { useOrder } from '@App/core/modules/cart';
import { SmartFoodSeo } from '@App/core/seo';
type LandingLayoutProps = {
  children: ReactNode;
  titlePage?: string;
} & BoxProps;
export const LandingLayout: FC<LandingLayoutProps> = ({
  children,
  titlePage,
  ...props
}) => {
  useOrder();
  return (
    <Fragment>
      <SmartFoodSeo seo={{ title: titlePage ?? '' }} />
      <Box mt="20" {...props}>
        <NavBar />
        {children}
        <LandingFooter />
      </Box>
    </Fragment>
  );
};

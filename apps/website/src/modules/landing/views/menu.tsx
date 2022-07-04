import { LandingLayout } from '../landingLayout';
import Header from '../components/menu/header';
import { ProductsGrid } from '../shared';
import { Box } from '@chakra-ui/react';
import {
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
export const MenuPage = () => {
  const inputSearchSize = useBreakpointValue({
    base: 'md',
    lg: 'lg',
  });
  return (
    <LandingLayout>
      <Header />
      <Box textAlign={'center'} my={8}>
        <InputGroup
          size={inputSearchSize}
          maxW={['300px', null, 'xl', '3xl']}
          mx="auto"
        >
          <InputLeftElement>
            <FiSearch />
          </InputLeftElement>
          <Input placeholder="¿Qué te provoca pedir?" />
        </InputGroup>
      </Box>
      <Box mb={12}>
        <ProductsGrid />
        <ProductsGrid />
        <ProductsGrid />
      </Box>
    </LandingLayout>
  );
};

export default MenuPage;

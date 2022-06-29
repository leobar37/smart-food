import { ComponentMeta } from '@storybook/react';
import { ExoticCard } from '../components/card';
import { HStack, Link } from '@chakra-ui/react';
export default {
  title: 'Components / ExoticCard',
} as ComponentMeta<any>;

const defaultProps = {
  title: 'Arma tu Poke Bowl',
  subTitle: 'A sólo s/24.90',
  link: <Link>Haz Click</Link>,
  src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
};

export const Normal = () => {
  return (
    <HStack spacing={4}>
      <ExoticCard {...defaultProps} variant="large" />
      <ExoticCard {...defaultProps} variant="small" />
    </HStack>
  );
};

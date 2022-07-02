import { CardProduct, SliderCounter } from '../components';
import { ComponentMeta } from '@storybook/react';
import { Button, VStack } from '@chakra-ui/react';
export default {
  title: 'components / cardProduct',
} as ComponentMeta<any>;

const commonProps = {
  content: {
    title: 'Plato 1',
    description: `Mix de lechugas, quinua, chalaquita, atún, salsa de tiradito, salsa
acevichada.`,
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    price: 24.9,
  },
  button: <Button>Agregar al carrito</Button>,
  counter: <SliderCounter value={10} />,
};

export const Normal = () => {
  return (
    <VStack spacing={5}>
      <CardProduct {...commonProps} />
      <CardProduct {...commonProps} size="mobile" />
    </VStack>
  );
};

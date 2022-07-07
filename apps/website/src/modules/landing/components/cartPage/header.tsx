import { Box, Text } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Box
      as="header"
      sx={{
        height: ['25vh', null, '40vh', '50vh'],
        backgroundImage: `bg-stains.png`,
        backgroundPosition: 'center 105%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          px: 2,
          maxHeight: 'max-content',
        }}
      >
        <Text
          fontSize={['2xl', null, '4xl', '5xl']}
          fontWeight="semibold"
          color={'smartgray.500'}
          as="h2"
        >
          Carrito de Compras
        </Text>
        <Text color={'smartgray.300'} fontSize={['base', null, 'xl', '2xl']}>
          Aquí podrás visualizar todos los productos que hayas agregados a tu
          carrito de compras.
        </Text>
      </Box>
    </Box>
  );
};

export default Header;

import { Box, Link, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { ExoticCard } from '@smartfood/ui';
const defaultProps = {
  title: 'Arma tu Poke Bowl',
  subTitle: 'A sólo s/24.90',
  link: <Link>Haz Click</Link>,
  src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
};

export const ArmedProducts = () => {
  const cardVariant = useBreakpointValue<'small' | 'large'>({
    base: 'small',
    md: 'large',
  });

  return (
    <Box
      sx={{
        textAlign: 'center',
        bg: '#CBF1C8',
        py: [4, null, 6],
        px: [2, null, 4],
      }}
    >
      <Text
        as="h3"
        fontSize={['xl', null, '2xl']}
        fontWeight={'semibold'}
        textColor="smartgray.700"
        my={2}
      >
        Arma lo más te guste
      </Text>
      <Text fontSize={['md', null, 'xl']}>
        Arma tu plato o bebida como más te guste, elige los ingrediemte que más
        te gusten. Tenemos + de 25 ingredientes para crearlos.
      </Text>
      <Stack
        width={'full'}
        my={[4, null, 8]}
        spacing={5}
        alignItems={'center'}
        justifyContent="center"
        w="full"
        direction={['column', null, 'row']}
      >
        <ExoticCard variant={cardVariant} {...defaultProps} />
        <ExoticCard variant={cardVariant} {...defaultProps} />
      </Stack>
    </Box>
  );
};

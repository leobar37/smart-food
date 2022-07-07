import { Box, Link, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { ExoticCard } from '@smartfood/ui';
import { DEMO_IMAGE } from '@App/constants';
const defaultProps = {
  title: 'Arma tu Poke Bowl',
  subTitle: 'A sólo s/24.90',
  link: <Link>Haz Click</Link>,
  src: DEMO_IMAGE,
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
        py: [4, null, 6],
        px: [2, null, 4],
        backgroundImage: `bg-stains.png`,
        backgroundPosition: 'center 105%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
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
      <Text fontSize={['md', null, 'xl']} maxWidth="5xl" mx="auto">
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

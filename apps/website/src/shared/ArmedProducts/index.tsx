import { Container, Heading, Stack, Text, Link } from '@chakra-ui/react';
import { ExoticCard } from '@smartfood/ui';

const defaultProps = {
  title: 'Arma tu Poke Bowl',
  subTitle: 'A sólo s/24.90',
  link: <Link>Haz Click</Link>,
  src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
};

export const ArmedProducts = () => {
  return (
    <Container
      sx={{
        textAlign: 'center',
        bg: '#CBF1C8',
        py: 4,
      }}
    >
      <Heading as="h3" size={'md'} textColor="smartgray.700" my={2}>
        Arma lo más te guste
      </Heading>
      <Text>
        Arma tu plato o bebida como más te guste, elige los ingrediemte que más
        te gusten. Tenemos + de 25 ingredientes para crearlos.
      </Text>
      <Stack
        width={'full'}
        mt={4}
        spacing={5}
        alignItems={'center'}
        direction={['column']}
      >
        <ExoticCard variant="small" {...defaultProps} />
        <ExoticCard variant="small" {...defaultProps} />
      </Stack>
    </Container>
  );
};

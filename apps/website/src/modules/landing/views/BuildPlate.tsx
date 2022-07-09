import {
  Box,
  Button,
  chakra,
  Container,
  HStack,
  Link,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { ResumenPreview, SelectSection } from '../components/buildplate';
import { LandingLayout } from '../landingLayout';
import { Stepper, StepperItem } from '@smartfood/ui';
const Title = chakra('h2', {
  baseStyle: {
    mx: 'auto',
    textAlign: 'center',
    color: 'smartgreen.500',
    fontWeight: 'semibold',
    fontSize: ['2xl', null, '3xl'],
    textTransform: 'uppercase',
  },
});

const BuildPlatePage = () => {
  return (
    <LandingLayout>
      <Container my="8" maxWidth={'6xl'}>
        <Stack direction={'row'}>
          <Box flex={['100%', null, '50%']} w="full">
            <Title>Arma tu plato</Title>
            <HStack my={3} w="full" justifyContent={'center'} height="42px">
              <Stepper value={1} onChange={(prev) => {}} size={'normal'}>
                <StepperItem>Base y proteína</StepperItem>
                <StepperItem>Veggies</StepperItem>
                <StepperItem>Salsas y toppings</StepperItem>
              </Stepper>
            </HStack>
            <SelectSection />
            <SelectSection />
            <SelectSection />
            <VStack mt={'8'} alignItems={['center', null, 'flex-start']}>
              <Link
                display={['initial', null, 'none']}
                color={'smartgreen.500'}
                fontSize={'md'}
              >
                Ver Resumen
              </Link>
              <Button colorScheme={'smartgray'} size="lg">
                Continuar
              </Button>
            </VStack>
          </Box>
          <Box flex="40%" display={['none', null, 'block']}>
            <ResumenPreview />
          </Box>
        </Stack>
      </Container>
    </LandingLayout>
  );
};

export default BuildPlatePage;

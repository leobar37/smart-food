import {
  Box,
  Button,
  chakra,
  Container,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BtnIcon, Stepper, StepperItem } from '@smartfood/ui';
import { useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  currentProductAtom,
  currentStepAtom,
  selectionAtom,
} from '@App/core/modules/product';
import {
  ModalConfirmationPlate,
  ResumenPreview,
  ResumenPreviewModal,
  SelectSection,
  FooterSelectSection,
} from './components';
import { useSingleProduct } from '@App/core/modules/product';
import { LandingLayout } from '@App/core/shared-components';
import { BackButton } from '@smartfood/ui';
import { Provider as JotaiProvider } from 'jotai';
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

const BuildPlateSteps = () => {
  const allOptions = useAtomValue(selectionAtom);
  const currentStep = useAtomValue(currentStepAtom);
  const product = useAtomValue(currentProductAtom);
  const router = useRouter();

  const steps = Object.values(allOptions).map((option) => {
    return <StepperItem key={option.id}>{option.name}</StepperItem>;
  });

  return (
    <Box mt={4}>
      <HStack justifyContent={'center'}>
        <BackButton
          position={['static', null, 'absolute']}
          top={['0', null, '5']}
          left={[0, null, '0', '-3rem']}
          onClick={() => {
            router.push('/armatuplato');
          }}
        >
          Volver
        </BackButton>
        <Title>Arma tu {product.name}</Title>
      </HStack>
      <HStack my={3} w="full" justifyContent={'center'} height="42px">
        <Stepper value={currentStep} onChange={(prev) => {}} size={'normal'}>
          {steps}
        </Stepper>
      </HStack>
    </Box>
  );
};

const BuildPlatePage = () => {
  const router = useRouter();
  const id = router.query?.id as string;
  const { data: product } = useSingleProduct(id);
  const setProduct = useUpdateAtom(currentProductAtom);

  useEffect(() => {
    if (product) {
      setProduct(product);
    }
  }, [product, setProduct]);

  if (!product) {
    return null;
  }

  return (
    <LandingLayout>
      <Container
        position={'relative'}
        mt={['20', null, '8']}
        mb="8"
        maxWidth={'6xl'}
        minH={'80vh'}
      >
        <Stack direction={'row'}>
          <Box flex={['100%', null, '50%']} w="full">
            <BuildPlateSteps />
            <SelectSection />
            <FooterSelectSection />
          </Box>
          <Box flex="40%" display={['none', null, 'block']}>
            <ResumenPreview />
          </Box>
        </Stack>
      </Container>
      <ResumenPreviewModal />
      <ModalConfirmationPlate />
    </LandingLayout>
  );
};

const BuildPlateContainer = () => {
  return (
    <JotaiProvider>
      <BuildPlatePage />
    </JotaiProvider>
  );
};

export default BuildPlateContainer;

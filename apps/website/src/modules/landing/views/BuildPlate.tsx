import {
  Box,
  Button,
  chakra,
  Container,
  HStack,
  Link,
  Stack,
  VStack,
  Text,
} from '@chakra-ui/react';
import { Stepper, StepperItem } from '@smartfood/ui';
import { useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  currentOptionsFamily,
  currentProductAtom,
  currentStepAtom,
  selectionAtom,
} from '../atoms/buildProductAtoms';
import {
  ResumenPreview,
  ResumenPreviewModal,
  SelectSection,
  useResumePreviewModal,
} from '../components/buildplate';
import { useSingleProduct } from '../controllers';
import { LandingLayout } from '../landingLayout';
import { BiArrowBack } from 'react-icons/bi';
import { BtnIcon } from '@smartfood/ui';

const BackIcon = chakra(BiArrowBack);

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

const Header = () => {
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
        <BtnIcon
          position={['static', null, 'absolute']}
          top={['0', null, '5']}
          display={'flex'}
          left={[0, null, '0', '-3rem']}
          fontSize="2xl"
          gap={'1rem'}
          px="3"
          onClick={() => {
            router.back();
          }}
        >
          <BackIcon fontSize={'lg'} />{' '}
          <Text fontSize={'md'} display={['none', null, null, 'block']}>
            Volver
          </Text>
        </BtnIcon>
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

const SelectionSection = () => {
  const currentStep = useAtomValue(currentStepAtom);
  const currentOption = useAtomValue(currentOptionsFamily(currentStep));
  return currentOption && <SelectSection option={currentOption} />;
};

const BuildPlatePage = () => {
  const router = useRouter();
  const id = router.query?.id as string;
  const { data: product } = useSingleProduct(id);
  const setProduct = useUpdateAtom(currentProductAtom);
  const updateStep = useUpdateAtom(currentStepAtom);
  const modalPreviewState = useResumePreviewModal();
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
      >
        <Stack direction={'row'}>
          <Box flex={['100%', null, '50%']} w="full">
            <Header />
            <SelectionSection />
            <VStack mt={'8'} alignItems={['center', null, 'flex-start']}>
              <Link
                display={['initial', null, 'none']}
                color={'smartgreen.500'}
                fontSize={'md'}
                onClick={() => {
                  modalPreviewState.onOpen();
                }}
              >
                Ver Resumen
              </Link>
              <HStack justifyContent={'space-around'}>
                <Button
                  colorScheme={'smartgray'}
                  variant="outline"
                  minW={[null, null, '12rem']}
                  onClick={() => {
                    updateStep((prev) => {
                      if (prev == 0) {
                        return 0;
                      }
                      return prev - 1;
                    });
                  }}
                  size="lg"
                >
                  Atrás
                </Button>
                <Button
                  minW={[null, null, '12rem']}
                  colorScheme={'smartgray'}
                  onClick={() => {
                    updateStep((prev) => {
                      if (prev == 4) {
                        return 0;
                      }
                      return prev + 1;
                    });
                  }}
                  size="lg"
                >
                  Continuar
                </Button>
              </HStack>
            </VStack>
          </Box>
          <Box flex="40%" display={['none', null, 'block']}>
            <ResumenPreview />
          </Box>
        </Stack>
      </Container>
      <ResumenPreviewModal />
    </LandingLayout>
  );
};

export default BuildPlatePage;

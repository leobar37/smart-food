import {
  Box,
  Button,
  Container,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { BackButton, SliderCounter } from '@smartfood/ui';
import { useRouter } from 'next/router';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSingleProduct } from '@App/core/modules/product';
import { LandingLayout } from '@App/core/shared-components';
import { isNil } from 'lodash';

type ContentProps = {
  text: string;
};

const Content: FC<ContentProps> = ({ text }) => {
  return (
    <Box
      mx="5"
      sx={{
        color: 'smartgray.500',
        li: {
          ml: '8',
        },
        ul: {
          my: 2,
        },
      }}
    >
      <ReactMarkdown
        components={{
          h2: ({ children }) => {
            return (
              <Text my="2" fontWeight={'semibold'} fontSize="lg">
                {children}
              </Text>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </Box>
  );
};

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data: product } = useSingleProduct(id);

  if (isNil(product)) {
    return null;
  }

  const textDescription =
    product.description ||
    (product.description && product.description.length > 0)
      ? product.description
      : product.excerpt;

  return (
    <LandingLayout>
      <Container maxWidth={'6xl'} my="28" position={'relative'}>
        <Stack
          direction={['column', null, 'row']}
          align={['initial', null, 'start']}
          spacing={[1, null, 8]}
          sx={{
            my: 8,
          }}
        >
          <Box
            as="figure"
            maxWidth={'32rem'}
            sx={{
              w: 'full',
              overflow: 'hidden',
              rounded: 'lg',
              mt: ['initial', null, '12'],
            }}
          >
            <Image
              alt="text"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            />
          </Box>
          <Stack direction={'column'} spacing={4}>
            <HStack mt={['8']}>
              <BackButton
                onClick={() => {
                  router.back();
                }}
                position={'absolute'}
                left="2"
                top={['-10', null, '-3']}
              >
                Volver
              </BackButton>
              <Text
                fontSize={['2xl', null, '5xl']}
                fontWeight="semibold"
                color="smartgreen.500"
              >
                {product.name}
              </Text>
            </HStack>
            <Content text={textDescription ?? ''} />
            <Stack spacing={3}>
              <SliderCounter value={1} />
              <Text
                fontWeight={'semibold'}
                fontSize={'2xl'}
                color="smartgreen.500"
              >
                {product.price} S/.
              </Text>
            </Stack>
            <Stack direction={['column', 'row']}>
              <Button variant={'outline'} size="lg" colorScheme="smartgray">
                Agregar carrito
              </Button>
              <Button size="lg" colorScheme="smartgray">
                Pedir ahora
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </LandingLayout>
  );
};
export default ProductPage;

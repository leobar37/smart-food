import {
  Box,
  Link,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ExoticCard } from '@smartfood/ui';
import NextLink from 'next/link';
import { PRODUCTS_FOR_BUILD_ID } from '../../constants';
import { useCategoriesWithProducts } from '../../controllers';
export const ArmedProducts = () => {
  const cardVariant = useBreakpointValue<'small' | 'large'>({
    base: 'small',
    md: 'large',
  });

  const { data: categories } = useCategoriesWithProducts();
  const buildeaBleCategory = categories?.find(
    (d) => d.id == PRODUCTS_FOR_BUILD_ID,
  );

  if (!buildeaBleCategory) {
    return null;
  }

  const productsRender = buildeaBleCategory.products?.map((product) => (
    <LinkBox key={product.id}>
      <ExoticCard
        variant={cardVariant}
        title={`Arma tu ${product.name}`}
        link={
          <NextLink passHref href={`/armatuplato/${product.id}`}>
            <LinkOverlay>
              <Link as="span">Haz Click</Link>
            </LinkOverlay>
          </NextLink>
        }
        src={product?.photo?.publicUrlTransformed ?? ''}
        subTitle={`A sólo S/.${product.price}`}
      />
    </LinkBox>
  ));
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
        {buildeaBleCategory.title}
      </Text>
      <Text fontSize={['md', null, 'xl']} maxWidth="5xl" mx="auto">
        {buildeaBleCategory.description}
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
        {productsRender}
      </Stack>
    </Box>
  );
};

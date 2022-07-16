import { Box, Link, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { ExoticCard } from '@smartfood/ui';
import { DEMO_IMAGE } from '@App/constants';
import { useCategoriesWithProducts } from '../../controllers';
import { PRODUCTS_FOR_BUILD_ID } from '../../constants';

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
    <ExoticCard
      key={product.id}
      variant={cardVariant}
      title={`Arma tu ${product.name}`}
      link={<Link>Haz Click</Link>}
      src={product?.photo?.publicUrlTransformed ?? ''}
      subTitle={`A sólo S/.${product.price}`}
    />
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

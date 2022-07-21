import {
  Badge,
  Box,
  HStack,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Product } from '@smartfood/client/v2';
import { FC, Fragment } from 'react';

type SearchItemProps = {
  includeSeparator?: boolean;
  product: Product;
};

const ProductItem: FC<SearchItemProps> = ({ includeSeparator, product }) => {
  return (
    <Fragment>
      <LinkBox>
        <Stack
          direction={'row'}
          alignItems="center"
          my={['4', null, '2']}
          justifyContent="space-between"
        >
          <HStack>
            <Box
              as="picture"
              sx={{
                maxW: ['4.5rem', null, '6.5rem'],
              }}
            >
              <Image
                src={product?.photo?.publicUrlTransformed ?? ''}
                alt="demo image"
              />
            </Box>
            <VStack alignItems={'flex-start'}>
              <Link
                color="smartgray.500"
                fontWeight={['normal', null, 'semibold']}
                textAlign="start"
                fontSize={['md', null, null, 'xl']}
              >
                <LinkOverlay>{product?.name}</LinkOverlay>
              </Link>
              <Badge fontSize={'xs'}>{product?.category?.name ?? ''}</Badge>
            </VStack>
          </HStack>
          <Text
            color="smartgreen.500"
            fontSize={['lg', null, '2xl']}
            fontWeight={['semibold', null, 'black']}
          >
            {product.price} S/.
          </Text>
        </Stack>
      </LinkBox>

      {includeSeparator && <Box as="hr" mx="auto" w="80%" bg="gray.500" />}
    </Fragment>
  );
};
ProductItem.defaultProps = {
  includeSeparator: false,
};

export default ProductItem;

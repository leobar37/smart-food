import { useDetailedOrder } from '@App/core/modules/cart';
import {
  Box,
  Divider,
  HStack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import NextImage from 'next/image';

export const DetailProducts = () => {
  const detailOrder = useDetailedOrder();
  if (!detailOrder) {
    // TODO: show loading here
    return null;
  }
  const { linesWithProduct, totalPrice } = detailOrder;
  const lines = linesWithProduct ?? [];
  return (
    <Box minWidth={'14rem'}>
      <Text
        mt={12}
        mb={4}
        fontWeight={'semibold'}
        fontSize="xl"
        color="smartgray.500"
      >
        Resumen
      </Text>
      <VStack alignItems={'flex-start'}>
        <Wrap direction={'column'} pb={2}>
          {lines.map((line, idx) => (
            <WrapItem gap={2} alignItems={'center'} key={idx}>
              <NextImage
                src={line.product?.photo?.publicUrlTransformed ?? ''}
                width={60}
                height={60}
              />
              <Box>
                <Text fontSize={'xl'}>{line.product?.name}</Text>
                <Text fontWeight={'normal'}>
                  {line.quantity} x {line.product?.price} S/.
                </Text>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
        <Divider
          borderWidth={'1px'}
          borderColor="smartgray.500"
          borderStyle={'solid'}
          bg="smargray.500"
          w="full"
        />
      </VStack>
      <HStack
        sx={{
          fontSize: 'xl',
          mt: 2,
        }}
        justifyContent={'space-between'}
      >
        <Text fontWeight={'normal'}>Total:</Text>
        <Text>{totalPrice}S/.</Text>
      </HStack>
    </Box>
  );
};

export default DetailProducts;

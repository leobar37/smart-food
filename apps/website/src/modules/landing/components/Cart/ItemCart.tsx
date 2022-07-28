import {
  Box,
  chakra,
  HStack,
  IconButton,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { OrderLineOutput, Product } from '@smartfood/client/v2';
import { SliderCounter } from '@smartfood/ui';
import NextImage from 'next/image';
import { FC, useMemo } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { debounce } from 'lodash';
import { useDeleteOrderLine, useUpdateLine } from '../../controllers';
import { useState, useEffect } from 'react';

const TrashIcon = chakra(FiTrash2);

type ItemCartProps = {
  line: OrderLineOutput & {
    product: Product | null;
  };
  isEditable: boolean;
};
export const ItemCart: FC<ItemCartProps> = ({ line, isEditable }) => {
  const deleteOrderLine = useDeleteOrderLine();
  const updateLine = useUpdateLine();
  const actions = useMemo(
    () => (
      <HStack
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        {isEditable && <Link>Editar</Link>}
        <IconButton
          aria-label="Eliminar Plato"
          onClick={() => {
            deleteOrderLine.mutate(line.id ?? '');
          }}
          sx={{
            bg: 'transparent',
            fontSize: ['base', null, 'xl'],
          }}
        >
          <TrashIcon />
        </IconButton>
      </HStack>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isEditable],
  );

  const debouncedUpdateLine = useMemo(
    () => debounce(updateLine.mutate, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const { product, quantity } = line;
  const [localQuantity, setQuantity] = useState(quantity ?? 0);

  useEffect(() => {
    if (quantity !== localQuantity) {
      debouncedUpdateLine({
        lineId: line.id!,
        quantity: localQuantity,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localQuantity]);

  return (
    <HStack
      as="article"
      sx={{
        position: 'relative',
        maxWidth: '30rem',
        minWidth: ['20rem', null, '23rem'],
        width: 'full',
      }}
      spacing={4}
    >
      <Box
        as="picture"
        sx={{
          maxWidth: ['8rem', null, '9rem'],
          overflow: 'hidden',
          rounded: 'md',
        }}
      >
        <NextImage
          src={product?.photo?.publicUrlTransformed ?? ''}
          alt="not implemented"
          width={150}
          height={150}
          objectFit="cover"
        />
      </Box>
      <VStack spacing={3} alignItems={'flex-start'}>
        {actions}
        <Text
          fontSize={['xl', null, '2xl']}
          fontWeight={'semibold'}
          color="smartgreen.500"
        >
          {product?.name}
        </Text>
        <SliderCounter
          value={localQuantity}
          minusDisabled={localQuantity === 0}
          onMinus={() => {
            setQuantity((prev) => prev - 1);
          }}
          onPlus={() => {
            setQuantity((prev) => prev + 1);
          }}
          size="small"
        />
        <Text
          fontWeight={'semibold'}
          fontSize={['md', null, 'lg', 'xl']}
          color="smartgreen.500"
        >
          {product?.price} S/.
        </Text>
      </VStack>
    </HStack>
  );
};

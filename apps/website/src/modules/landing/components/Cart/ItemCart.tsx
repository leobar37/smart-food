import { DEMO_IMAGE } from '@App/constants';
import {
  Box,
  chakra,
  HStack,
  IconButton,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { SliderCounter } from '@smartfood/ui';
import NextImage from 'next/image';
import { useMemo } from 'react';
import { FiTrash2 } from 'react-icons/fi';
const TrashIcon = chakra(FiTrash2);

export const ItemCart = () => {
  const actions = useMemo(
    () => (
      <HStack
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        <Link>Editar</Link>
        <IconButton
          aria-label="Eliminar Plato"
          sx={{
            bg: 'transparent',
            fontSize: ['base', null, 'xl'],
          }}
        >
          <TrashIcon />
        </IconButton>
      </HStack>
    ),
    [],
  );

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
          src={DEMO_IMAGE}
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
          Plato 1
        </Text>
        <SliderCounter value={0} size="small" />
        <Text
          fontWeight={'semibold'}
          fontSize={['md', null, 'lg', 'xl']}
          color="smartgreen.500"
        >
          S/ 24.90
        </Text>
      </VStack>
    </HStack>
  );
};

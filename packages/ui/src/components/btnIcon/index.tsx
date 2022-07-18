import { chakra } from '@chakra-ui/react';

export const BtnIcon = chakra('a', {
  baseStyle: {
    m: 0,
    p: 2,
    bg: 'transparent',
    rounded: 'full',
    cursor: 'pointer',
    svg: {
      color: 'smartgray.500',
      fontSize: ['xl', null, '2xl'],
    },
    _hover: {
      bg: 'gray.100',
    },
  },
});

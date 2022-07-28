import { chakra } from '@chakra-ui/react';
export const SearchContainer = chakra('div', {
  baseStyle: {
    position: 'absolute',
    bg: 'transparent',
    w: '100%',
    zIndex: 1,
    top: '100%',
    justifyContent: 'center',
    minHeight: '220px',
    '.content': {
      width: ['100%', null, '89%'],
      bg: 'white',
      px: ['2', null, '8'],
      shadow: 'md',
      rounded: 'md',
      py: ['1', null, '5'],
    },
  },
});

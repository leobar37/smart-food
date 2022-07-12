import { chakra } from '@chakra-ui/react';

export const SliderWrapper = chakra('div', {
  baseStyle: {
    '.bullet': {
      width: 3,
      height: 3,
    },
    '.swiper-pagination-bullet-active': {
      bg: 'smartgreen.500',
    },
    '.swiper-pagination': {
      position: 'absolute',
      bottom: 0,
      zIndex: 50,
    },
    '.swiper-button-prev,.swiper-button-next': {
      color: 'smartgreen.500',
      display: ['none', null, 'initial'],
      top: '40%',
    },
  },
});

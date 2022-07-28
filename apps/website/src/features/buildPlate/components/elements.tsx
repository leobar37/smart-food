import { chakra } from '@chakra-ui/react';

export const ResumeTitle = chakra('h3', {
  baseStyle: {
    fontSize: '2xl',
    mx: 'auto',
    textAlign: 'center',
    color: 'smartgreen.500',
    fontWeight: 'semibold',
  },
});

export const ResumenContainer = chakra('aside', {
  baseStyle: {
    bg: 'white',
    p: '5',
    rounded: 'md',
    mt: [2, null, 9],
    maxW: '24rem',
    overflow: 'hidden',
    w: ['20rem', '25rem'],
  },
});

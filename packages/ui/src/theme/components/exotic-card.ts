import type { ComponentMultiStyleConfig } from '@chakra-ui/theme';
import { CSSObject, theme } from '@chakra-ui/react';
const ExoticCard: ComponentMultiStyleConfig = {
  parts: ['card', 'image', 'box', 'info'],
  baseStyle: {
    card: {
      position: 'relative',
      zIndex: 4,
      rounded: 'lg',
      overflow: 'hidden',
      cursor: "pointer",
    },
    image: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 5,
    },
    box: {
      bg: 'transparent',
      position: 'absolute',
      zIndex: 6,
      width: '100%',
      height: '80px',
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    info: {
      bg: 'rgba(114, 203, 16,0.7)',
      width: '90%',
      height: '57px',
      rounded: 'lg',
      justifyContent: 'space-between',
      px: '3',
      py: '2',
      color: 'white',
      backdropFilter: 'blur(5px)',
    },
  },
  variants: {
    large: {
      card: {
        fontSize: '1rem',
        width: '20.375rem',
        height: '20.375rem',
      },
    },
    small: {
      card: {
        fontSize: '0.9rem',
        width: '17.375rem',
        height: '17.375rem',
      },
    },
  },
  defaultProps: {
    variant: 'large',
  },
};

export default ExoticCard;

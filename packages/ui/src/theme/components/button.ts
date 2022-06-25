import { SystemStyleObject } from '@chakra-ui/theme-tools';
import { Theme, theme } from '@chakra-ui/theme';

const buttonTheme = theme.components.Button;

const baseStyle: SystemStyleObject = {
  borderRadius: 'full',
};

const variants = {};

const sizes: Theme['components']['Button']['sizes'] = {
  lg: {
    h: 10,
    minW: 12,
    fontSize: 'lg',
    px: 10,
  },
  md: {
    h: 8,
    minW: 10,
    fontSize: 'md',
    px: 6,
  },
  sm: {
    h: 7,
    minW: 8,
    fontSize: 'sm',
    px: 5,
  },
  xs: {
    h: 7,
    minW: 6,
    fontSize: 'xs',
    px: 4,
  },
};

export default {
  baseStyle,
  variants,
  sizes,
};

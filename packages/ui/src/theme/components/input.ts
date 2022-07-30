import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import { PartsStyleObject, PartsStyleFunction } from '@chakra-ui/theme-tools';

const baseStyle: PartsStyleObject<typeof parts> = {};

const variantOutline: PartsStyleFunction<typeof parts> = ({ theme }) => {
  const color = theme.colors.smartgreen['500'];
  return {
    field: {
      borderRadius: '8px',
      _focusVisible: {
        borderColor: color,
        boxShadow: `0 0 0 1px ${color}`,
      },
    },
  };
};

const variants = {
  outline: variantOutline,
};

export default {
  parts: parts.keys,
  baseStyle,
  variants,
};

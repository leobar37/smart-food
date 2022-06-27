import { popoverAnatomy as parts } from '@chakra-ui/anatomy';
import { cssVar } from '@chakra-ui/react';
import { SystemStyleObject, PartsStyleFunction } from '@chakra-ui/theme-tools';

const $arrowSize = cssVar('popper-arrow-size');

const baseStyleContent: SystemStyleObject = {
  border: 'none',
  borderRadius: 'lg',
  [$arrowSize.variable]: '15px',
  boxShadow: '0px 4px 22px 0px rgba(0, 0, 0, 0.1)',
};

const variants = {};

const baseStyle: PartsStyleFunction<typeof parts> = () => ({
  content: baseStyleContent,
});

export default {
  parts: parts.keys,
  baseStyle,
  variants,
};

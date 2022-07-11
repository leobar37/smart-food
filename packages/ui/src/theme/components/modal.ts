import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { SystemStyleObject } from '@chakra-ui/react';
import { PartsStyleFunction } from '@chakra-ui/theme-tools';

const baseStyleOverlay: SystemStyleObject = {
  backdropFilter: 'blur(5px)',
};

const baseStyle: PartsStyleFunction<typeof parts> = () => ({
  overlay: baseStyleOverlay,
});

export default {
  baseStyle,
};

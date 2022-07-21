import { useBreakpointValue } from '@chakra-ui/react';

const breakpoints = {
  xs: 'xs',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  '2xl': '2xl',
  base: 'base',
};

export const useBreakpoint = (breakpoint: keyof typeof breakpoints) => {
  const value = useBreakpointValue(breakpoints);
  console.log(value);

  return value === breakpoint;
};

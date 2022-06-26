import { useBreakpointValue } from '@chakra-ui/react';
export const useBreakpintValue = () => {
  return useBreakpointValue({
    base: 'base',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
    '2xl': '2xl',
  });
};

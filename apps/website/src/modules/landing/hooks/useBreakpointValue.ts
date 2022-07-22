import { useIsMobileContext } from '@App/helpers/isMobileContext';
import { useBreakpointValue } from '@chakra-ui/react';

export function useBreakpointValueSSR<T = any>(
  values: Partial<Record<string, T>> | T[],
) {
  const { isMobile } = useIsMobileContext();

  const fallback = isMobile ? 'base' : 'xl';
  return useBreakpointValue(values, { fallback });
}

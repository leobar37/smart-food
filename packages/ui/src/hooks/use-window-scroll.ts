import { useState } from 'react';
import { useSafeLayoutEffect } from '@chakra-ui/react';
export const useWindowScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useSafeLayoutEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  return scrollPosition;
};

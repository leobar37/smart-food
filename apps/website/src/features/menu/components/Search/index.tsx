import {
  Input,
  InputGroup,
  InputLeftElement,
  useBoolean,
} from '@chakra-ui/react';
import { useBreakpoint, useMounted } from '@smartfood/ui';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { queryAtom } from '@App/core/modules/product';
import { useBreakpointValueSSR } from '../../../../core/hooks/useBreakpointValue';
import { SearchContent } from './SearchContent';

export const SearchInput = () => {
  const [query, setQuery] = useAtom(queryAtom);
  const isMounted = useMounted();

  const inputSearchSize = useBreakpointValueSSR({
    base: 'md',
    lg: 'lg',
  });

  const [isOpen, modalContent] = useBoolean(false);

  const isMd = useBreakpoint('base');

  useEffect(() => {
    if (query.length > 3) {
      modalContent.on();
      if (isMd) {
        window.scrollTo({
          behavior: 'smooth',
          top: 200,
        });
      }
    } else {
      modalContent.off();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, modalContent]);

  if (!isMounted) {
    return null;
  }
  return (
    <InputGroup
      size={inputSearchSize}
      maxW={['350px', null, 'xl', '3xl']}
      mx="auto"
      sx={{
        position: 'relative',
      }}
    >
      <InputLeftElement>
        <FiSearch />
      </InputLeftElement>
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="¿Qué te provoca pedir?"
      />
      <SearchContent isOpen={isOpen} />
    </InputGroup>
  );
};

export default SearchInput;

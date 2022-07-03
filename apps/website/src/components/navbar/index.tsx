import {
  Box,
  chakra,
  HStack,
  IconButton,
  useBoolean,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { Brand, CartIcon, MenuIcon } from '@smartfood/ui';
import { FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import LinkItem from './LinkItem';

const CloseIcon = chakra(AiOutlineClose);

const BtnIcon = chakra(IconButton, {
  baseStyle: {
    m: 0,
    p: 1,
    bg: 'transparent',
    svg: {
      color: 'smartgray.500',
      fontSize: ['xl', null, '2xl'],
    },
    _hover: {
      bg: 'gray.300',
    },
  },
});

const Nav = chakra('nav', {
  baseStyle: {
    display: 'flex',
    w: 'full',
    bg: 'white',
    px: ['2', null, '4'],
    py: ['2', null, '4'],
    mx: 'auto',
    maxW: '8xl',
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
});

type Properties = {
  brandSize: 'sm' | 'lg';
};

export const NavBar: FC = () => {
  const [navBarState, navbarActions] = useBoolean(false);

  const propertiesByBr = useBreakpointValue<Properties>({
    base: {
      brandSize: 'sm',
    },
    md: {
      brandSize: 'lg',
    },
  });
  const items = ['Inicio', 'Arma tu plato', 'Carta', 'Nosotros'];
  const items$ = items.map((d, idx) => <LinkItem key={idx}>{d}</LinkItem>);
  const isVisibleMenuButton = useBreakpointValue([true, null, false]);

  return (
    <Box
      sx={{
        w: 'full',
        bg: 'white',
        position: 'relative',
      }}
    >
      <Nav as="nav">
        <Box flex="20%">
          <Brand size={propertiesByBr?.brandSize} />
        </Box>
        <HStack
          flex="60%"
          display={['none', null, 'flex']}
          alignSelf="center"
          justifyContent="center"
          spacing={3}
        >
          {items$}
        </HStack>
        <HStack flex="20%" justifyContent="flex-end">
          <BtnIcon aria-label="carrito" icon={<CartIcon />} />
          <BtnIcon
            display={isVisibleMenuButton ? 'initial' : 'none'}
            aria-label="menu"
            onClick={() => {
              navbarActions.toggle();
            }}
            icon={navBarState ? <CloseIcon /> : <MenuIcon />}
          />
        </HStack>
      </Nav>
      <Box
        sx={{
          position: 'absolute',
          w: 'full',
          bg: 'white',
          top: '100%',
          left: 0,
          display: navBarState ? 'block' : 'none',
          zIndex: 10,
          py: 2,
        }}
      >
        <VStack
          alignItems={'flex-start'}
          sx={{
            py: 2,
            ml: 2,
          }}
        >
          {items.map((item, idx) => (
            <LinkItem key={idx}>{item}</LinkItem>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

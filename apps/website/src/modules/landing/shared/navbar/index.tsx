import {
  Box,
  chakra,
  HStack,
  IconButton,
  useBoolean,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { Brand, CartIcon, MenuIcon, useWindowScroll } from '@smartfood/ui';
import NextLink from 'next/link';
import { FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import LinkItem from './LinkItem';
import { cx } from '@chakra-ui/utils';
const CloseIcon = chakra(AiOutlineClose);

const BtnIcon = chakra(IconButton, {
  baseStyle: {
    m: 0,
    p: 2,
    bg: 'transparent',
    svg: {
      color: 'smartgray.500',
      fontSize: ['xl', null, '2xl'],
    },
    _hover: {
      bg: 'gray.200',
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

const NavWrapper = chakra('div', {
  baseStyle: {
    w: 'full',
    bg: 'white',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 150,
    '&.fixed': {
      backdropFilter: 'blur(5px)',
      opacity: 0.9,
    },
  },
});

type Properties = {
  brandSize: 'sm' | 'lg';
};

type NavBarItem = {
  title: string;
  url: string;
};

export const NavBar: FC = () => {
  const [navBarState, navbarActions] = useBoolean(false);
  const scrollY = useWindowScroll();
  const propertiesByBr = useBreakpointValue<Properties>({
    base: {
      brandSize: 'sm',
    },
    md: {
      brandSize: 'lg',
    },
  });
  const items: NavBarItem[] = [
    {
      title: 'Inicio',
      url: '/',
    },
    {
      title: 'Arma tu plato',
      url: '/armatuplato',
    },
    {
      title: 'Carta',
      url: '/carta',
    },
    // {
    //   title: 'Nosotros',
    //   url: '/us',
    // },
  ];

  const items$ = items.map((d, idx) => (
    <LinkItem url={d.url} key={idx}>
      {d.title}
    </LinkItem>
  ));
  const isVisibleMenuButton = useBreakpointValue([true, null, false]);

  return (
    <NavWrapper className={cx(`${scrollY > 100 && 'fixed'}`)}>
      <Nav as="nav">
        <NextLink href={'/'}>
          <Box as="a" flex="20%" cursor={'pointer'}>
            <Brand size={propertiesByBr?.brandSize} />
          </Box>
        </NextLink>
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
            <LinkItem url={item.url} key={idx}>
              {item.title}
            </LinkItem>
          ))}
        </VStack>
      </Box>
    </NavWrapper>
  );
};

export default NavBar;

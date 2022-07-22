import { Box, HStack, useBoolean, VStack } from '@chakra-ui/react';
import { useBreakpointValueSSR } from '../../hocks/useBreakpointValue';
import { Brand, BtnIcon, MenuIcon, CartIconWithCounter } from '@smartfood/ui';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import LinkItem from './LinkItem';
import { CloseIcon, Nav, NavWrapper } from './styles';
import { useOrderLinesCount } from '../../controllers';

type Properties = {
  brandSize: 'sm' | 'lg';
};

type NavBarItem = {
  title: string;
  url: string;
};

export const NavBar: FC = () => {
  const [navBarState, navbarActions] = useBoolean(false);
  const router = useRouter();

  const propertiesByBr = useBreakpointValueSSR<Properties>({
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
  ];

  const compare = (path: string) => {
    return path === router.pathname;
  };

  const items$ = items.map((d, idx) => (
    <LinkItem variant="desktop" selected={compare(d.url)} url={d.url} key={idx}>
      {d.title}
    </LinkItem>
  ));

  const isVisibleMenuButton = useBreakpointValueSSR([true, null, false]);

  const linesCount = useOrderLinesCount();

  return (
    <NavWrapper>
      <Nav as="nav" height="100%">
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
          <NextLink passHref href={'/carrito'}>
            <BtnIcon as={'a'} aria-label="carrito" position="relative">
              <CartIconWithCounter value={linesCount} />
            </BtnIcon>
          </NextLink>
          <BtnIcon
            display={isVisibleMenuButton ? 'initial' : 'none'}
            aria-label="menu"
            onClick={() => {
              navbarActions.toggle();
            }}
          >
            {navBarState ? <CloseIcon /> : <MenuIcon />}
          </BtnIcon>
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
            <LinkItem selected={compare(item.url)} url={item.url} key={idx}>
              {item.title}
            </LinkItem>
          ))}
        </VStack>
      </Box>
    </NavWrapper>
  );
};

export default NavBar;

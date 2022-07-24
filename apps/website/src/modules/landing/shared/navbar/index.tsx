import {
  Box,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useBoolean,
  useUpdateEffect,
  VStack,
} from '@chakra-ui/react';
import {
  BadgeWithCount,
  Brand,
  BtnIcon,
  CartIcon,
  CheckNotificationIcon,
  MenuIcon,
} from '@smartfood/ui';
import { useAtomValue } from 'jotai';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { linesCountAtom, notificationAddedAtom } from '../../atoms/cartAtoms';
import { useBreakpointValueSSR } from '../../hooks/useBreakpointValue';
import LinkItem from './LinkItem';
import { CloseIcon, Nav, NavWrapper } from './styles';
import { useNotificationCart } from '../../hooks';
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
  const notificationCart = useNotificationCart();
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

  const linesCount = useAtomValue(linesCountAtom);

  useUpdateEffect(() => {
    let timeout: any = null;
    if (notificationCart.isOpen) {
      timeout = setTimeout(() => {
        notificationCart.close();
      }, 1500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [notificationCart.isOpen]);

  const cartIconNode = (
    <Popover isOpen={notificationCart.isOpen} placement="bottom-end">
      <PopoverTrigger>
        <BadgeWithCount bg="smartgray.300" color="white" value={linesCount}>
          <NextLink passHref href={'/carrito'}>
            <IconButton
              cursor={'pointer'}
              as="span"
              aria-label=""
              bg="transparent"
              icon={<CartIcon />}
            />
          </NextLink>
        </BadgeWithCount>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <HStack>
            <CheckNotificationIcon width={35} height={35} />
            <Text>Se añadió correctamente.</Text>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );

  return (
    <NavWrapper>
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
          {cartIconNode}
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

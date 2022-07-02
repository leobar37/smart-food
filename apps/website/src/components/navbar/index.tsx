import {
  Box,
  chakra,
  HStack,
  IconButton,
  Link,
  SystemStyleObject,
  useBoolean,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import {} from '@emotion/react';
import { matcher } from '@smartfood/common';
import { Brand, CartIcon, MenuIcon } from '@smartfood/ui';
import { FC, ReactNode, useMemo } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const CloseIcon = chakra(AiOutlineClose);

type Properties = {
  brandSize: 'sm' | 'lg';
};

const BaseLink = chakra(Link, {
  baseStyle: {
    my: 2,
    pl: 3,
    textDecoration: 'none!important',
    borderBottomWidth: '1px',
    borderBottomColor: 'transparent',
    _hover: {
      borderBottomWidth: '1px',
      borderBottomColor: 'smartgreen.700',
    },
  },
});
type LinkItemProps = {
  variant?: 'mobile' | 'desktop';
  selected?: boolean;
  children: ReactNode;
};

const LinkItem: FC<LinkItemProps> = ({ variant, children, selected }) => {
  const perVariant = useMemo(
    () =>
      matcher<SystemStyleObject, Exclude<LinkItemProps['variant'], undefined>>(
        variant,
      )({
        desktop: {
          ...(selected ? {} : {}),
        },
        mobile: {
          ...(selected
            ? {
                position: 'relative',
                '&:before': {
                  content: "''",
                  position: 'absolute',
                  width: '3px',
                  h: 'full',
                  bg: 'smartgreen.700',
                  top: '0',
                  left: 0,
                },
              }
            : {}),
        },
      }),
    [variant, selected],
  );

  return (
    <BaseLink
      sx={{
        ...perVariant,
      }}
    >
      {children}
    </BaseLink>
  );
};
LinkItem.defaultProps = {
  selected: false,
  variant: 'mobile',
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
      <HStack
        as="nav"
        w="full"
        bg="white"
        py="2"
        px="2"
        overflow={'visible'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Brand size={propertiesByBr?.brandSize} />
        <HStack
          display={['none', null, 'flex']}
          mx="auto"
          flexGrow={1}
          justifyContent="center"
          spacing={3}
        >
          {items$}
        </HStack>
        <HStack>
          <IconButton
            bg="transparent"
            m="0"
            p="0"
            aria-label="carrito"
            icon={
              <CartIcon fontSize={['xl', null, '2xl']} color="smartgray.500" />
            }
          />
          <IconButton
            m="0"
            p="0"
            bg="transparent"
            display={isVisibleMenuButton ? 'initial' : 'none'}
            _hover={{
              bg: 'gray.300',
            }}
            aria-label="menu"
            onClick={() => {
              navbarActions.toggle();
            }}
            icon={
              navBarState ? (
                <CloseIcon fontSize={['xl', null, '2xl']} />
              ) : (
                <MenuIcon
                  fontSize={['xl', null, '2xl']}
                  color="smartgray.500"
                />
              )
            }
          />
        </HStack>
      </HStack>
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

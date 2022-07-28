import { chakra, Link } from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';

export const CloseIcon = chakra(AiOutlineClose);

export const Nav = chakra('nav', {
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

export const NavWrapper = chakra('div', {
  baseStyle: {
    w: 'full',
    bg: 'white',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 150,
    borderBottomWidth: '1px',
    borderBottomColor: '#e2e8f0',
  },
});

export const BaseLink = chakra(Link, {
  baseStyle: {
    my: 2,
    textDecoration: 'none!important',
    borderBottomWidth: '1px',
    borderBottomColor: 'transparent',
    _hover: {
      borderBottomWidth: '2px',
      borderBottomColor: 'smartgreen.500',
    },
  },
});

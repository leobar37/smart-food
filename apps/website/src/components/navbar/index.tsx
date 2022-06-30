import { Container, HStack, IconButton } from '@chakra-ui/react';
import { Brand, CartIcon, MenuIcon } from '@smartfood/ui';
import { FC } from 'react';

export const NavBar: FC = () => {
  return (
    <Container maxWidth="8xl">
      <HStack
        as="nav"
        w="full"
        bg="white"
        py="2"
        px="2"
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Brand size="sm" />
        <HStack>
          <IconButton
            bg="transparent"
            m="0"
            p="0"
            aria-label="carrito"
            icon={<CartIcon fontSize="xl" color="smartgray.500" />}
          />
          <IconButton
            m="0"
            p="0"
            bg="transparent"
            aria-label="menu"
            icon={<MenuIcon fontSize="xl" color="smartgray.500" />}
          />
        </HStack>
      </HStack>
    </Container>
  );
};

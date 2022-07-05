import {
  Box,
  chakra,
  Container,
  createIcon,
  Flex,
  HStack,
  IconButton,
  List,
  ListItem,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Brand } from '@smartfood/ui';
import { FiFacebook, FiInstagram } from 'react-icons/fi';

const BookIcon = createIcon({
  displayName: 'BookIcon',
  path: [
    <path
      key={1}
      d="M34.794 31.613v18.298c0 .61.32 1.47-.426 1.794-.64.287-.995-.503-1.421-.898-4.37-3.91-9.63-5.704-15.315-6.565a43.288 43.288 0 0 0-5.294-.43c-2.132-.036-3.162-1.077-3.162-3.265a6528.84 6528.84 0 0 1 0-37.313c0-2.296 1.03-3.265 3.304-3.229 7.32.108 14.035 1.902 19.4 7.355 1.955 2.01 3.021 4.234 2.914 7.176-.142 5.704 0 11.409 0 17.077ZM38.312 31.434c0-5.669.142-11.373-.071-17.042-.107-2.834.96-4.95 2.772-6.888C44.92 3.306 49.93 1.333 55.403.4a25.262 25.262 0 0 1 4.94-.395c2.557.036 3.481.933 3.552 3.588.036 1.722 0 3.48 0 5.202V39.47c0 3.588-.71 4.27-4.192 4.413-7.462.323-14.391 2.117-20.076 7.391-.249.251-.533.61-.889.43-.604-.287-.426-.932-.426-1.434V31.434Z"
      fill="#fff"
    />,
    <path
      key={2}
      d="M30.388 54.072c-3.98-.717-7.923-.932-11.867-.897-4.478 0-8.848.646-13.183 1.543-3.162.646-4.37-.287-4.37-3.516V12.455c0-2.404.817-3.444 2.736-3.696 1.243-.143 1.918.287 1.918 1.65v30.317c0 4.126 2.026 6.386 6.005 6.71 5.223.43 10.411.896 15.066 3.623 1.386.789 2.843 1.47 3.695 3.013ZM42.683 54.037c0-.79.64-1.005 1.066-1.328 4.37-3.193 9.274-4.628 14.603-4.987 1.422-.107 2.843-.18 4.229-.394 2.878-.467 4.832-2.942 4.832-6.171.036-9.4 0-18.764 0-28.164 0-.61-.035-1.184 0-1.794.071-.968-.32-2.224 1.137-2.404 1.28-.143 2.487.216 3.163 1.507.284.539.32 1.148.32 1.758v39.824c0 2.332-1.35 3.48-3.554 3.014-8.421-1.83-16.842-2.404-25.37-.718-.071 0-.249-.107-.426-.143Z"
      fill="#fff"
    />,
  ],
  viewBox: '0 0 73 55',
});

const ListFooter = chakra(Stack, {
  baseStyle: {
    display: 'flex',
    direction: 'column',
    alignItems: ['center', null, 'flex-start'],
    textAlign: ['center', null, 'start'],
    '.list': {
      mt: 2,
      fontSize: ['md', null, 'sm', 'md'],
    },
  },
});

const BtSocialIcon = chakra(IconButton, {
  baseStyle: {
    cursor: 'pointer',
    m: 2,
    _hover: {
      bg: 'transparent',
      transform: 'scale(1.08)',
    },
  },
});
export const Footer = () => {
  const brandSize = useBreakpointValue<'sm' | 'lg'>({
    base: 'sm',
    md: 'lg',
  });
  return (
    <Box
      as="footer"
      sx={{
        bg: 'smartgreen.700',
        w: 'full',
      }}
    >
      <Container
        maxWidth={'7xl'}
        sx={{
          py: [5, null, 10],
          textColor: 'white',
        }}
      >
        <Stack
          w="full"
          spacing={[5, null, 6]}
          justifyContent={['center', null, 'space-between']}
          direction={['column', null, 'row']}
        >
          <Stack
            textAlign={['center', null, 'left']}
            alignItems={['center', null, 'flex-start']}
            direction={['column']}
            spacing={2}
          >
            <Brand color="black" size={brandSize} />
            <Box
              as="span"
              fontWeight={'medium'}
              mt={2}
              sx={{
                textAlign: ['center', 'start'],
              }}
            >
              <Text as="p">Address: Example street 21</Text>
              <Text as="p">Telephone: Example street 21</Text>
            </Box>
          </Stack>
          <ListFooter>
            <Text fontWeight={'semibold'}>Contenido</Text>
            <List className="list">
              <ListItem>Inicio</ListItem>
              <ListItem>Arma tu plato</ListItem>
              <ListItem>Carta</ListItem>
              <ListItem>Nosostros</ListItem>
            </List>
          </ListFooter>
          <ListFooter>
            <Text fontWeight={'semibold'}>Legal</Text>
            <List className="list">
              <ListItem>Término y condiciones</ListItem>
              <ListItem>Política de privacidad</ListItem>
            </List>
          </ListFooter>

          <Stack alignItems={'center'}>
            <BookIcon fontSize={'8xl'} />
            <Text>Libro de reclamaciones</Text>
          </Stack>
        </Stack>
        <Flex
          justifyContent={'space-between'}
          my="4"
          borderTopWidth={'2px'}
          borderTopColor="white"
          alignItems={'center'}
          py="4"
        >
          <Text as="p" fontSize="md">
            @2022 SmartFood. All rights reserved.
          </Text>
          <HStack
            sx={{
              alignItems: 'center',
              a: {
                bg: 'transparent',
                svg: {
                  fontSize: '2xl',
                },
              },
            }}
          >
            <BtSocialIcon as="a" aria-label="Facebook">
              <FiFacebook />
            </BtSocialIcon>
            <BtSocialIcon as="a" aria-label="Instagram">
              <FiInstagram />
            </BtSocialIcon>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

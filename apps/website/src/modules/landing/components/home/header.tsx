import { Box, Image, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box
      sx={{
        height: ['40vh', null, '70vh'],
        position: 'relative',
        width: '100vw',
      }}
    >
      <Image
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: '0',
          left: 0,
          objectFit: 'cover',
          zIndex: 4,
        }}
        alt="image"
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          top: '0',
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 5,
        }}
      >
        <Box
          sx={{
            zIndex: 5,
            bg: 'rgba(114, 203, 16,0.7)',
            backdropFilter: 'blur(5px)',
            color: 'white',
            textAlign: 'center',
            py: [3, null, 6, 8],
            px: [5, null, null, 12],
            h2: {
              fontSize: ['lg', null, 'xl', '2xl', '5xl'],
              textTransform: 'uppercase',
              fontWeight: 'semibold',
            },
          }}
          borderRadius={'md'}
        >
          <Text as="h2">¡Ya puedes realizar</Text>
          <Text
            as="h2"
            color="smartgray.700"
            fontWeight={'semibold'}
            fontSize="lg"
          >
            Tu pedido!
          </Text>
          <Text as="h3" fontSize={['md', null, 'lg']}>
            Es hora de un cambio inteligente
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

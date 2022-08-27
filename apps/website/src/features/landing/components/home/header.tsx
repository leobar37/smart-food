import { Box, Button, HStack, Img, Link, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Autoplay]);

const Header = () => {
  return (
    <Box
      sx={{
        height: ['40vh', null, '70vh'],
        position: 'relative',
        width: '100%',
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
          zIndex: 6,
          position: 'absolute',
        }}
      >
        <Box
          sx={{
            zIndex: 5,
            // bg: 'rgba(114, 203, 16,0.7)',
            backdropFilter: 'blur(5px)',
            color: 'white',
            textAlign: 'center',
            py: [3, null, 6, 8],
            px: [2, null, null, 12],
            h2: {
              fontSize: ['lg', null, 'xl', '2xl', '5xl'],
              textTransform: 'uppercase',
              fontWeight: 'semibold',
            },
          }}
          borderRadius={'md'}
        >
          <Text
            fontSize={['4xl', null, '8xl']}
            fontWeight="black"
            textTransform={'uppercase'}
          >
            Un cambio inteligente
          </Text>
          <Text as="h3" fontSize={['md', null, 'xl']}>
            Arma tu propio Poke Bowl o escoge uno ya hecho
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

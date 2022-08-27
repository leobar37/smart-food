import { Box, Button, HStack, Img, Link, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Autoplay]);

const Header = () => {
  const router = useRouter();
  const imagesNodes = Array.from({ length: 8 }).map((_, idx) => {
    return (
      <SwiperSlide key={idx}>
        <Img
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0',
            left: 0,
            objectFit: 'cover',
            objectPosition: 'center top',
            zIndex: 4,
          }}
          src={`/cover/smart${idx + 1}.webp`}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0',
            left: 0,
            background: 'black',
            zIndex: 5,
            opacity: 0.4,
            border: 'none',
            outline: 'none',
          }}
        />
      </SwiperSlide>
    );
  });

  const buttonsNode = (
    <Box
      sx={{
        position: ['absolute', null, 'static'],
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'column',
        zIndex: 7,
      }}
    >
      <Link
        sx={{
          position: ['static', null, 'absolute'],
          fontWeight: 'semibold',
          fontSize: 'lg',
          cursor: 'pointer',
          zIndex: 7,
          width: '100%',
          textAlign: ['center', null, 'start'],
          bottom: 10,
          left: 110,
          color: 'white',
        }}
        target={'_blank'}
        href="tel:923033531"
      >
        Perú(+51) 923 033 531
      </Link>
      <HStack
        sx={{
          position: ['static', null, 'absolute'],
          color: 'white',
          zIndex: 7,
          bottom: 10,
          right: 110,
          width: '100%',
          justifyContent: ['center', null, 'flex-end'],
          my: 4,
          a: {
            fontWeight: 'semibold',
            fontSize: 'lg',
            cursor: 'pointer',
          },
        }}
      >
        <Link target={'_blank'} href="https://www.instagram.com/smart_foodhd/">
          Instagram
        </Link>
        <Link target={'_blank'} href="https://www.facebook.com/SmartFoodHD">
          Facebook
        </Link>
      </HStack>
    </Box>
  );

  return (
    <Box
      sx={{
        position: 'relative',
        overflowX : "hidden",
        '.swiper-slide': {
          height: ['80vh', null, '90vh'],
          position: 'relative',
          width: '100%',
        },
      }}
    >
      {buttonsNode}
      <Swiper loop autoplay effect="slide">
        {imagesNodes}
      </Swiper>
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
          <HStack justifyContent={'center'} mt={5}>
            <Button
              onClick={() => {
                router.push('/carta');
              }}
              colorScheme={'smartgray'}
              size={['md', null, 'lg']}
            >
              Nuestro menú
            </Button>
            <Button
              onClick={() => {
                router.push('/armatuplato');
              }}
              colorScheme={'smartgray'}
              size={['md', null, 'lg']}
            >
              Armar mi plato
            </Button>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

import {
  Box,
  Button,
  chakra,
  Container,
  Flex,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { CardProduct, SliderCounter } from '@smartfood/ui';
import { useRef } from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { Navigation, Pagination } from 'swiper';

import 'swiper/css';

import 'swiper/css/navigation';

import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';

const SliderWrapper = chakra('div', {
  baseStyle: {
    '.bullet': {
      width: 3,
      height: 3,
    },
    '.swiper-pagination-bullet-active': {
      bg: 'smartgreen.500',
    },
    '.swiper-pagination': {
      position: 'absolute',
      bottom: 0,
      zIndex: 50,
    },
    '.swiper-button-prev,.swiper-button-next': {
      color: 'smartgreen.500',
      display: ['none', null, 'initial'],
      top: '40%',
    },
  },
});

const productProps = {
  content: {
    title: 'Plato 1',
    description: `Mix de lechugas, quinua, chalaquita, atún, salsa de tiradito, salsa
  acevichada.`,
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    price: 24.9,
  },
  button: <Button>Agregar al carrito</Button>,
  counter: <SliderCounter value={10} />,
};

export const ProductsLine = () => {
  const paginationRef = useRef(null);
  const cardSize = useBreakpointValue({
    base: 'mobile',
    lg: 'desktop',
  });

  return (
    <Container
      sx={{
        my: 5,
      }}
      maxWidth={['3xl', null, '4xl', '6xl']}
    >
      <Box
        sx={{
          textAlign: 'center',
          py: '3',
          px: 1,
          my: [2, null, 4],
        }}
      >
        <Text
          fontWeight={'semibold'}
          fontSize={['2xl', null, '3xl', '4xl']}
          textColor={'smartgreen.700'}
          textAlign="center"
          my={2}
        >
          Prueba nuestros armados para ti
        </Text>
        <Text fontSize={['sm', null, 'md', 'xl']}>
          Elige entre toda la variedad de platos deliciosos que hemos armado
          pensando en ti.
        </Text>
      </Box>
      <SliderWrapper>
        <Swiper
          centeredSlides
          pagination={{
            renderBullet: (idx, className) => {
              return `<span class="bullet ${className}"></span>`;
            },
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            700: {
              slidesPerView: 1,
              spaceBetween: 15,
              initialSlide: 1,
              centeredSlides: true,
            },

            1200: {
              slidesPerView: 2,
              spaceBetween: -10,
              initialSlide: 1,
              centeredSlides: false,
            },
          }}
          modules={[Pagination, Navigation]}
          navigation
        >
          {Array.from({ length: 5 }).map((_, idx) => (
            <SwiperSlide key={idx}>
              <CardProduct
                mb="16"
                mx={['auto']}
                size={cardSize as any}
                {...productProps}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderWrapper>

      <Flex justifyContent={'center'} my={6}>
        <Button
          variant={'solid'}
          size="lg"
          colorScheme="smartgreen"
          rightIcon={<HiChevronDoubleRight />}
        >
          Ver Carta{' '}
        </Button>
      </Flex>
    </Container>
  );
};

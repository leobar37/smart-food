import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { CardProduct, SliderCounter } from '@smartfood/ui';
import { FC } from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { SliderWrapper } from './styles';

import { Product } from '@smartfood/client/v2';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

type ProductsLineProps = {
  title: string;
  description: string;
  products: Product[];
};

export const ProductsLine: FC<ProductsLineProps> = ({
  title,
  description,
  products,
}) => {
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
          {title}
        </Text>
        <Text fontSize={['sm', null, 'md', 'xl']}>{description}</Text>
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
          {products.map((product, idx) => (
            <SwiperSlide key={idx}>
              <CardProduct
                mb="16"
                mx={['auto']}
                size={cardSize as any}
                button={<Button>Agregar al carrito</Button>}
                counter={<SliderCounter value={10} />}
                content={{
                  description: product?.excerpt ?? '',
                  image: product.photo?.publicUrlTransformed ?? '',
                  price: product?.price ?? 0,
                  title: product?.name ?? '',
                }}
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

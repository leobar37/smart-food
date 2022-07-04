import {
  Box,
  chakra,
  Image,
  SystemStyleObject,
  Text,
  VStack,
  BoxProps,
} from '@chakra-ui/react';
import { matcher } from '@smartfood/common';
import { cloneElement, FC, ReactNode } from 'react';

type CardProductProps = {
  content: {
    title: string;
    description: string;
    price: number;
    image: string;
  };
  button: ReactNode;
  counter: ReactNode;
  size?: 'mobile' | 'desktop';
} & BoxProps;

const BoxContent = chakra(Box, {
  baseStyle: {
    maxW: '450px',
    display: 'flex',
    rounded: 'md',
    bg: 'white',
    shadow: 'md',
  },
});

const CardImage = chakra('figure', {
  baseStyle: {
    flex: '45%',
    minWidth: '200px',
    overflow: 'hidden',
  },
});

export const CardProduct: FC<CardProductProps> = ({
  content,
  button,
  counter,
  size,
  ...props
}) => {
  const descriptionNode = matcher<ReactNode, CardProductProps['size']>(size)({
    desktop: (
      <Text fontSize={'md'} color="smartgray.700">
        {content.description}
      </Text>
    ),
    mobile: null,
  });

  const properties = matcher<any, CardProductProps['size']>(size)({
    desktop: {
      boxSx: {
        fontSize: '1rem',
      },
      buttonSx: {
        size: 'lg',
      } as SystemStyleObject,
      imageSx: {
        minWidth: '200px',
      } as SystemStyleObject,
    },
    mobile: {
      boxSx: {
        fontSize: '0.8rem',
      },
      buttonSx: {
        size: 'md',
      },
      imageSx: {
        minWidth: ['120px'],
        width: ['125px'],
      } as SystemStyleObject,
    },
  });

  const buttonCloned = cloneElement(button as any, {
    variant: 'outline',
    colorScheme: 'smartgray',
    ...properties.buttonSx,
  });
  return (
    <BoxContent {...props}>
      <VStack
        px="2"
        py={3}
        height={'100%'}
        alignItems={['flex-start']}
        justifyContent="flex-end2"
        textAlign={'start'}
        alignSelf={'center'}
      >
        <Text color="smartgreen.700" fontSize={'2xl'} fontWeight={['semibold']}>
          {content.title}
        </Text>
        {descriptionNode}
        {counter}
        <Text color="smartgreen.700" fontSize={'2xl'} fontWeight="semibold">
          S/ {content.price}
        </Text>
        {buttonCloned}
      </VStack>

      <CardImage sx={properties.imageSx}>
        <Image
          sx={{
            w: 'full',
            objectFit: 'cover',
            h: 'full',
          }}
          src={content.image}
        />
      </CardImage>
    </BoxContent>
  );
};

CardProduct.defaultProps = {
  size: 'desktop',
};

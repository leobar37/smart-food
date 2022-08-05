import {
  Box,
  BoxProps,
  chakra,
  HStack,
  Image,
  SystemStyleObject,
  Text,
  VStack,
} from '@chakra-ui/react';
import { matcher } from '@smartfood/common';
import { cloneElement, FC, ReactNode } from 'react';

type CardProductProps = {
  content: {
    title: ReactNode;
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
    display: 'flex',
    rounded: 'md',
    flexDirection: 'column',
    bg: 'white',
    borderWidth: '1px',
    justifyContent: 'space-between',
  },
});

const CardImage = chakra('figure', {
  baseStyle: {
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
    mobile: (
      <Text fontSize={'md'} color="smartgray.700">
        {content.description}
      </Text>
    ),
  });

  const properties = matcher<any, CardProductProps['size']>(size)({
    desktop: {
      boxSx: {
        width: '20rem',
        fontSize: '1rem',
      },
      buttonSx: {
        size: 'sm',
      } as SystemStyleObject,
      imageSx: {
        width: 'full',
      } as SystemStyleObject,
    },
    mobile: {
      boxSx: {
        width: '18rem',
        fontSize: '0.8rem',
      },
      buttonSx: {
        size: 'sm',
      },
      imageSx: {
        width: 'full',
      } as SystemStyleObject,
    },
  });

  const buttonCloned = cloneElement(button as any, {
    ...properties.buttonSx,
  });
  return (
    <BoxContent {...props} sx={properties.boxSx}>
      <CardImage height={'full'} sx={properties.imageSx}>
        <Image
          sx={{
            w: 'full',
            objectFit: 'cover',
            maxHeight: '13rem',
          }}
          src={content.image}
        />
      </CardImage>
      <VStack
        py={3}
        px={4}
        alignItems={['flex-start']}
        justifyContent="flex-start"
        w="full"
        textAlign={'start'}
        alignSelf={'center'}
      >
        <Text
          as="div"
          color="smartgreen.700"
          fontSize={'2xl'}
          fontWeight={['semibold']}
        >
          {content.title}
        </Text>
        {descriptionNode}
        <Text color="smartgreen.700" fontSize={'2xl'} fontWeight="semibold">
          S/ {content.price}
        </Text>
        <HStack>
          {counter}
          {buttonCloned}
        </HStack>
      </VStack>
    </BoxContent>
  );
};

CardProduct.defaultProps = {
  size: 'desktop',
};

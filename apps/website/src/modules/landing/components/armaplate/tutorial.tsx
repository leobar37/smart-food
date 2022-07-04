import {
  Box,
  Container,
  Flex,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import { FC } from 'react';

type CardTutorialProps = {
  title: string;
  description: string;
  image: string;
};
const CardTutorial: FC<CardTutorialProps> = ({ description, title, image }) => {
  const sizeImage = useBreakpointValue({
    base: '150px',
    lg: '220px',
  });
  return (
    <VStack
      sx={{
        my: 3,
        mx: 'auto',
        maxWidth: '250px',
        justifyContent: 'flex-start',
      }}
    >
      <NextImage
        src={image}
        width={sizeImage}
        height={sizeImage}
        objectFit="cover"
      />
      <Text
        textTransform={'uppercase'}
        textColor="smartgreen.500"
        fontWeight={'semibold'}
      >
        {title}
      </Text>
      <Text textAlign={'center'}>{description}</Text>
    </VStack>
  );
};

const CardTutorialSection = () => {
  return (
    <Container maxWidth={'7xl'} py={['8', '10']}>
      <Box>
        <Text
          as="h3"
          textColor={'smartgreen.500'}
          fontWeight="bold"
          mx="auto"
          textAlign={'center'}
          fontSize={['2xl', null, '4xl']}
        >
          ¿Cómo armo mi plato?
        </Text>
        <Text fontSize={['md', null, 'lg']} textAlign="center" mt="1">
          Elige los ingredientes y crea el platoque más te guste. Tienes + de 25
          ingredientes para crearlo.
        </Text>
      </Box>
      <Flex
        mt={8}
        maxWidth="5xl"
        mx="auto"
        sx={{
          flexWrap: ['wrap', null, 'nowrap'],
        }}
      >
        <CardTutorial
          image="/tutorial/1.png"
          description={`(Elige 1 opción para tu base y para tu proteína)`}
          title="Elige tu base y proteína"
        />

        <CardTutorial
          image="/tutorial/2.png"
          description={`( Hasta 4 opciones a elegir)`}
          title="Elige tus veggies"
        />
        <CardTutorial
          image="/tutorial/3.png"
          description={`( Tienes hasta 2 opciones a elegir en salsa y 3 opciones en toppings)`}
          title="Elige tus salsas y toppings"
        />
      </Flex>
    </Container>
  );
};

export default CardTutorialSection;

import { Box, HStack, Image, Text, VStack, Link } from '@chakra-ui/react';

export const ExoticCard = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '326px',
        height: '326px',
        zIndex: 4,
        rounded : "lg",
        overflow: "hidden"
      }}
    >
      <Image
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 5,
        }}
        src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      />

      <Box
        sx={{
          bg: 'transparent',
          position: 'absolute',
          zIndex: 6,
          width: '100%',
          height: '80px',
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <HStack
          sx={{
            bg: 'smartgreen.500',
            width: '90%',
            height: '57px',
            rounded: 'lg',
            justifyContent :"space-between",
            px: "3",
            py : "2",
            color :"white"
          }}
        >
          <VStack fontWeight={"light"} alignItems={"start"} spacing="0">
            <Text>Arma tu Poke Bowl</Text>
            <Text>A sólo s/24.90</Text>
          </VStack>
          <VStack alignItems={"start"}  h="full">
            <Link>Haz clic</Link>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

import { Box, Image, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box
      sx={{
        height: ['40vh', null, '50vh'],
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
    </Box>
  );
};

export default Header;

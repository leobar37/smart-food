import { Box, Image } from '@chakra-ui/react';

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
        src="/cover/smart2.webp"
      />
    </Box>
  );
};

export default Header;

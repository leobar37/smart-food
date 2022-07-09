import { Box, Badge, BadgeProps } from '@chakra-ui/react';
import { ReactNode, FC } from 'react';

type BadgeWithCountProps = {
  children: ReactNode;
  value: ReactNode;
} & BadgeProps;

export const BadgeWithCount: FC<BadgeWithCountProps> = ({
  children,
  value,
  ...props
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 'fit-content',
      }}
    >
      <Badge
        sx={{
          position: 'absolute',
          top: -2,
          zIndex: 10,
          right: -1,
          width: '20px',
          height: '20px',
          rounded: 'full',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 1,
          ...props,
        }}
      >
        <Box>{value}</Box>
      </Badge>
      {children}
    </Box>
  );
};

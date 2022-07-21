import { FC } from 'react';
import { Box, chakra } from '@chakra-ui/react';
import { CartIcon } from '../../icons';

export type CartIconWithNumberProps = {
  value?: number;
  color?: string;
  circleColor?: string;
  counterColor?: string;
  width?: string;
  height?: string;
};

const CounterContainer = chakra('div', {
  baseStyle: {
    position: 'absolute',
    width: '1rem',
    height: '1rem',
    borderRadius: '50%',
    fontSize: '11px',
    transform: 'translate(-50%, -50%)',
    top: '0',
    left: '100%',
    textAlign: 'center',
  },
});

export const CartIconWithCounter: FC<CartIconWithNumberProps> = (props) => {
  return (
    <Box width={props.width} height={props.height} position="relative">
      <CartIcon
        width="100%"
        height="100%"
        color={props.color}
        display="block"
      />
      {props.value > 0 && (
        <CounterContainer bg={props.circleColor} color={props.counterColor}>
          {props.value > 99 ? 99 : props.value}
        </CounterContainer>
      )}
    </Box>
  );
};

CartIconWithCounter.defaultProps = {
  value: 0,
  color: 'smartgray.500',
  width: '22px',
  height: '22px',
  circleColor: '#DB242D',
  counterColor: 'white',
};

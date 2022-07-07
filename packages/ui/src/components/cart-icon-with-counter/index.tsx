import { FC } from 'react';
import { Box, chakra } from '@chakra-ui/react';
import { CartIcon } from '@smartfood/ui/src/icons';

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
    width: '13px',
    height: '13px',
    borderRadius: '50%',
    fontSize: '10px',
    top: '3px',
    right: '3px',
  },
});

export const CartIconWithCounter: FC<CartIconWithNumberProps> = (props) => {
  return (
    <Box width={props.width} height={props.height}>
      <CartIcon width="100%" height="100%" color={props.color} />
      <CounterContainer bg={props.circleColor} color={props.counterColor}>
        {props.value > 99 ? 99 : props.value}
      </CounterContainer>
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

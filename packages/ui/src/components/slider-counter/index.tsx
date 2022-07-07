import { HStack, IconButton, Text } from '@chakra-ui/react';
import { GoDash, GoPlus } from 'react-icons/go';

const baseStyle = {
  borderRadius: '50%',
  shadow: 'md',
  '&:disabled': {
    background: 'white',
    shadow: 'md',
    color: 'smartgray.500',
    '&:hover': {
      color: 'smartgray.500',
    },
  },
  '&:hover': {
    background: 'smartgreen.500',
    color: 'white',
  },
};

export type SliderCounterSizes = 'normal' | 'small';

export type SliderCounterProps = {
  value?: string | number;
  plusDisabled?: boolean;
  minusDisabled?: boolean;
  onPlus?: () => void;
  onMinus?: () => void;
  size?: SliderCounterSizes;
};

const getStyleBySize = (size: SliderCounterSizes) => {
  let widthAndHeight = '30px';
  let fontSize = '20px';

  switch (size) {
    case 'small':
      widthAndHeight = '25px';
      fontSize = '16px';
  }

  return {
    buttonStyle: {
      width: widthAndHeight,
      minWidth: widthAndHeight,
      height: widthAndHeight,
      minHeight: widthAndHeight,
    },
    textStyle: {
      fontSize,
    },
  };
};

export const SliderCounter: React.FC<SliderCounterProps> = ({
  value = 0,
  onPlus = () => {},
  onMinus = () => {},
  plusDisabled,
  minusDisabled,
  size = 'normal',
}) => {
  const { buttonStyle, textStyle } = getStyleBySize(size);

  return (
    <HStack spacing="14px">
      <IconButton
        disabled={minusDisabled}
        onClick={onMinus}
        sx={{ ...baseStyle, ...buttonStyle }}
        aria-label="minus-button"
        icon={<GoDash />}
      />
      <Text sx={textStyle}>{value}</Text>
      <IconButton
        disabled={plusDisabled}
        onClick={onPlus}
        sx={{ ...baseStyle, ...buttonStyle }}
        aria-label="plus-button"
        icon={<GoPlus size="15" />}
      />
    </HStack>
  );
};

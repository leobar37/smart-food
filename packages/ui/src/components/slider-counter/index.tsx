import { IconButton, HStack, Text } from '@chakra-ui/react';
import { GoPlus, GoDash } from 'react-icons/go';

const baseStyle = {
  borderRadius: '50%',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.2)',
  '&:disabled': {
    background: '#FCFCFD',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.2)',
    color: '#646082',
    '&:hover': {
      background: '#FCFCFD',
    },
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
        icon={<GoDash color="#646082" />}
      />
      <Text sx={textStyle}>{value}</Text>
      <IconButton
        disabled={plusDisabled}
        onClick={onPlus}
        sx={{ ...baseStyle, ...buttonStyle }}
        colorScheme="smartgreen"
        aria-label="plus-button"
        icon={<GoPlus size="15" />}
      />
    </HStack>
  );
};

import { Box, chakra, keyframes } from '@chakra-ui/react';
import { CSSProperties, FC, PropsWithChildren, useContext } from 'react';
import { StepperContext } from './Stepper';
import { BsCheck } from 'react-icons/bs';

export interface StepperItemProps extends PropsWithChildren {
  index?: number;
}

const centerStyle: CSSProperties = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
};

const Dot = chakra('div', {
  baseStyle: {
    ...centerStyle,
    top: 'auto',
    margin: 0,
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
});

const DotInside = chakra('div', {
  baseStyle: {
    ...centerStyle,
    borderRadius: '50%',
    margin: 'auto',
    width: '6px',
    height: '6px',
  },
});

const dotAnim = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.7);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
`;

const InvisibleButton = chakra('div', {
  baseStyle: {
    ...centerStyle,
    width: '40px',
    height: '40px',
  },
});

const checkStyle: CSSProperties = {
  ...centerStyle,
  color: 'white',
  width: 'calc(100% + 3px)',
  height: 'calc(100% + 3px)',
};

export const StepperItem: FC<StepperItemProps> = ({ children, index }) => {
  const { step, setStep } = useContext(StepperContext);

  const isActive = step >= index;
  const isComplete = step > index;

  return (
    <Box position="relative" margin="0 !important">
      <Dot
        animation={
          step === index
            ? `${dotAnim} forwards 400ms ease-in-out 150ms`
            : undefined
        }
        bg={isActive ? 'smartgreen.700' : 'white'}
      >
        {isComplete ? (
          <BsCheck style={checkStyle} />
        ) : (
          <DotInside bg={isActive ? 'white' : 'smartgray.200'} />
        )}
      </Dot>
      <Box position="absolute" mt="5px">
        <Box
          position="absolute"
          whiteSpace="nowrap"
          transform="translateX(-50%)"
          color={isActive ? 'smartgreen.700' : 'smartgray.300'}
          fontWeight={isActive ? 'bold' : 'normal'}
          userSelect="none"
        >
          {children}
        </Box>
      </Box>
      <InvisibleButton onClick={() => setStep(index)} />
    </Box>
  );
};

StepperItem.defaultProps = {
  index: 0,
};

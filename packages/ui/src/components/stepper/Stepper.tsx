import { FC, Children, createContext, cloneElement } from 'react';
import { chakra, Stack } from '@chakra-ui/react';

export interface StepperProps {
  value?: number;
  onChange?: (index: number) => void;
  size?: 'normal' | 'small';
  children: JSX.Element[];
}

interface StepperContextProps {
  step: number;
  setStep: (step: number) => void;
}

export const StepperContext = createContext<StepperContextProps>(null);

const Bar = chakra('div', {
  baseStyle: {
    position: 'absolute',
    width: 'calc(100% - 20px)',
    height: '2px',
    bg: 'smartgray.100',
    overflow: 'hidden',
  },
});

export const Stepper: FC<StepperProps> = ({
  value,
  onChange,
  size,
  ...props
}) => {
  const children = Children.map(props.children, (child, index) =>
    cloneElement(child, { ...child.props, index, size }),
  );

  const stepsCount = children.length - 1;

  return (
    <StepperContext.Provider value={{ step: value, setStep: onChange }}>
      <Stack
        position="relative"
        width="80%"
        height="100%"
        padding="10px"
        flexDir="row"
        justifyContent="space-between"
      >
        <Bar>
          <Bar
            transition="width 300ms"
            width={`${(value / stepsCount) * 100}%`}
            bg="smartgreen.700"
          />
        </Bar>
        {children}
      </Stack>
    </StepperContext.Provider>
  );
};

Stepper.defaultProps = {
  value: 0,
  onChange: () => {},
  size: 'normal',
};

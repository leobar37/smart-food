import { FC, Children, createContext, useMemo, cloneElement } from 'react';
import { chakra, Stack } from '@chakra-ui/react';

export interface StepperProps {
  value?: number;
  onChange?: (index: number) => void;
  children: JSX.Element[]; // No puede tener un solo elemento :eyes:
}

interface StepperContextProps {
  step: number;
  setStep: (step: number) => void;
}

export const StepperContext = createContext<StepperContextProps>(null);

const Bar = chakra('div', {
  baseStyle: {
    position: 'absolute',
    width: '100%',
    height: '2px',
    bg: 'smartgray.100',
    overflow: 'hidden',
  },
});

export const Stepper: FC<StepperProps> = ({ value, onChange, ...props }) => {
  //TODO: test optimization
  const children = useMemo(
    () =>
      Children.map(props.children, (child, index) =>
        cloneElement(child, {
          ...child.props,
          index,
        }),
      ),
    [],
  );

  const stepsCount = children.length - 1;

  return (
    <StepperContext.Provider value={{ step: value, setStep: onChange }}>
      <Stack
        width="100%"
        position="relative"
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
};

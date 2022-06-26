import {
  Button, HStack, VStack
} from '@chakra-ui/react';
import { ComponentMeta } from '@storybook/react';
import { HiChevronDoubleRight } from 'react-icons/hi';
export default {
  title: 'Components / button',
} as ComponentMeta<any>;

export const variants = () => {
  return (
    <VStack mt="16">
      <HStack>
        <Button variant={'solid'} colorScheme="smartgreen">
          Ver Todo
        </Button>

        <Button variant={'outline'} colorScheme="smartgreen">
          Ver Todo
        </Button>

        <Button variant={'outline'} disabled colorScheme="smartgreen">
          Ver Todo
        </Button>
      </HStack>
      <HStack>
        <Button variant={'solid'} colorScheme="smartgray">
          Ver Todo
        </Button>

        <Button variant={'outline'} colorScheme="smartgray">
          Ver Todo
        </Button>

        <Button variant={'outline'} disabled colorScheme="smartgray">
          Ver Todo
        </Button>
      </HStack>
      <HStack>
        <Button
          variant={'solid'}
          colorScheme="smartgreen"
          rightIcon={<HiChevronDoubleRight />}
        >
          Ver Todo
        </Button>

        <Button
          variant={'outline'}
          colorScheme="smartgreen"
          rightIcon={<HiChevronDoubleRight />}
        >
          Ver Todo
        </Button>

        <Button
          variant={'outline'}
          disabled
          colorScheme="smartgreen"
          rightIcon={<HiChevronDoubleRight />}
        >
          Ver Todo
        </Button>
      </HStack>
      <HStack>
        <Button
          variant={'solid'}
          colorScheme="smartgray"
          rightIcon={<HiChevronDoubleRight />}
        >
          Ver Todo
        </Button>

        <Button
          variant={'outline'}
          colorScheme="smartgray"
          rightIcon={<HiChevronDoubleRight />}
        >
          Ver Todo
        </Button>

        <Button
          variant={'outline'}
          disabled
          colorScheme="smartgray"
          rightIcon={<HiChevronDoubleRight />}
        >
          Ver Todo
        </Button>
      </HStack>
    </VStack>
  );
};

export const sizes = () => {
  return (
    <VStack>
      <HStack>
        <Button variant={'solid'} size="lg" colorScheme="smartgreen">
          Ver Todo
        </Button>

        <Button variant={'solid'} size="md" colorScheme="smartgreen">
          Ver Todo
        </Button>

        <Button variant={'solid'} size="sm" colorScheme="smartgreen">
          Ver Todo
        </Button>

        <Button variant={'solid'} size="xs" colorScheme="smartgreen">
          Ver Todo
        </Button>
      </HStack>
      <HStack>
        <Button variant={'solid'} size="lg" colorScheme="smartgray">
          Ver Todo
        </Button>

        <Button variant={'solid'} size="md" colorScheme="smartgray">
          Ver Todo
        </Button>

        <Button variant={'solid'} size="sm" colorScheme="smartgray">
          Ver Todo
        </Button>

        <Button variant={'solid'} size="xs" colorScheme="smartgray">
          Ver Todo
        </Button>
      </HStack>
    </VStack>
  );
};

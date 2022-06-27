import { ComponentMeta } from '@storybook/react';

import {
  Button,
  Text,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
  HStack,
} from '@chakra-ui/react';

import { CheckNotificationIcon } from '../icons/CheckNotificationIcon';

export default {
  title: 'Components / Cart Notification',
} as ComponentMeta<any>;

export const Normal = () => {
  return (
    <VStack mt="16">
      <HStack>
        <Popover isOpen placement="bottom-end">
          <PopoverTrigger>
            <Button>Cart</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <HStack>
                <CheckNotificationIcon width={35} height={35} />
                <Text>Se añadió correctamente.</Text>
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </VStack>
  );
};

import { BadgeWithCount } from '../components/BadgeWithCount';
import { Meta } from '@storybook/react';
import { IconButton } from '@chakra-ui/react';
import { CartIcon } from '@smartfood/ui/src/icons';

export default {
  title: 'Components / badgeWithCount',
} as Meta<any>;

export const Variants = () => {
  return (
    <BadgeWithCount bg="smartgray.300" color="white" value={2}>
      <IconButton aria-label="" bg="transparent" icon={<CartIcon />} />
    </BadgeWithCount>
  );
};

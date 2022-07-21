import { FC } from 'react';
import { ButtonProps, Text, chakra } from '@chakra-ui/react';
import { BtnIcon } from '../btnIcon';
import { BiArrowBack } from 'react-icons/bi';

const BackIcon = chakra(BiArrowBack);

export const BackButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <BtnIcon
      display={'flex'}
      fontSize="2xl"
      gap={'1rem'}
      px="3"
      {...(props as any)}
    >
      <BackIcon fontSize={'lg'} />{' '}
      <Text fontSize={'md'} display={['none', null, null, 'block']}>
        {children}
      </Text>
    </BtnIcon>
  );
};

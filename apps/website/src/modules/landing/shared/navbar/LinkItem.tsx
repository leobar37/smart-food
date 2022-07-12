import { SystemStyleObject } from '@chakra-ui/react';
import { matcher } from '@smartfood/common';
import NextLink from 'next/link';
import { FC, ReactNode, useMemo } from 'react';
import { BaseLink } from './styles';

export type LinkItemProps = {
  variant?: 'mobile' | 'desktop';
  selected?: boolean;
  children: ReactNode;
  url: string;
};

const LinkItem: FC<LinkItemProps> = ({ variant, children, selected, url }) => {
  const perVariant = useMemo(
    () =>
      matcher<SystemStyleObject, Exclude<LinkItemProps['variant'], undefined>>(
        variant,
      )({
        desktop: {
          ...(selected
            ? {
                textAlign: 'center',
                borderBottomWidth: '2px',
                borderBottomColor: 'smartgreen.500',
              }
            : {}),
        },
        mobile: {
          ...(selected
            ? {
                position: 'relative',
                '&:before': {
                  content: "''",
                  position: 'absolute',
                  width: '3px',
                  h: 'full',
                  bg: 'smartgreen.700',
                  top: '0',
                  left: 0,
                },
                pl: 2,
              }
            : {}),
        },
      }),
    [variant, selected],
  );

  return (
    <NextLink href={url}>
      <BaseLink
        fontSize={['sm', null, 'md', 'md']}
        sx={{
          ...perVariant,
        }}
      >
        {children}
      </BaseLink>
    </NextLink>
  );
};
LinkItem.defaultProps = {
  selected: false,
  variant: 'mobile',
};

export default LinkItem;

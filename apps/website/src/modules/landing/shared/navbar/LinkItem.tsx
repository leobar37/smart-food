import { chakra, Link, SystemStyleObject } from '@chakra-ui/react';
import { matcher } from '@smartfood/common';
import { FC, ReactNode, useMemo } from 'react';
import NextLink from 'next/link';
const BaseLink = chakra(Link, {
  baseStyle: {
    my: 2,
    pl: 3,
    textDecoration: 'none!important',
    borderBottomWidth: '1px',
    borderBottomColor: 'transparent',
    _hover: {
      borderBottomWidth: '1px',
      borderBottomColor: 'smartgreen.700',
    },
  },
});
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
          ...(selected ? {} : {}),
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

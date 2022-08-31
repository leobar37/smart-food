import { css } from '@emotion/css';
import { Stack } from '@keystone-ui/core';
import React, { FC } from 'react';
import type { ReactNode } from 'react';
import { Text } from '@chakra-ui/react';
type DeliveryDetails = {
  direction: string;
  phone: string;
};

export const PropertyLine: FC<{
  label: string;
  value: string | number | null;
}> = ({ label, value }) => {
  return (
    <Stack
      className={css`
        display: flex;
        min-width: 350px;
        flex-direction: row !important;
        margin-top: 1rem;
      `}
    >
      <Text mr="2" fontWeight={"semibold"}>{label}</Text>
      <Text marginLeft={'medium'}>{value}</Text>
    </Stack>
  );
};

export const PropertySection: FC<{ title: string; children?: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <Stack padding={'medium'}>
      <Text size="medium" color="black" fontWeight={"bold"}>
        {title}
      </Text>
      {children}
    </Stack>
  );
};

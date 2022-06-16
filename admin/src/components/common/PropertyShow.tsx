import { css } from '@emotion/css';
import { controller } from '@keystone-6/core/fields/types/virtual/views';
import { FieldProps } from '@keystone-6/core/types';
import { Box, Stack, Text } from '@keystone-ui/core';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
import { isString } from 'lodash';
import React, { FC } from 'react';
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
        display:  flex;
        min-width: 350px;
       flex-direction: row !important;
        margin-top: 1rem;
      `}
    >
      <Text
        className={css`
          font-weight: bold;
        `}
      >
        {label}
      </Text>
      <Text marginLeft={"medium"} >{value}</Text>
    </Stack>
  );
};

export const PropertySection: FC<{ title: string }> = ({ title, children }) => {
  return (
    <Stack  padding={"medium"}>
      <Text size="medium" color="black" weight="bold">
        {title}
      </Text>
      {children}
    </Stack>
  );
};


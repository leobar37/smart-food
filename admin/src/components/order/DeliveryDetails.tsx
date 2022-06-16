/** @jsxRuntime classic */
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

 const DetailLineInfo: FC<{
  label: string;
  value: string;
}> = ({ label, value }) => {
  return (
    <Stack
      className={css`
        flex-direction: row;
        margin-top: 1rem;
        gap: 15px;
      `}
    >
      <Text
        className={css`
          font-weight: bold;
        `}
      >
        {label}
      </Text>
      <Text>{value}</Text>
    </Stack>
  );
};

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) => {
  const info: DeliveryDetails =
    value && isString(value) ? JSON.parse(value) : value;

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <Box>
        <DetailLineInfo label="Dirección:" value={info.direction} />
        <DetailLineInfo label="Teléfono:" value={info.phone} />
      </Box>
    </FieldContainer>
  );
};

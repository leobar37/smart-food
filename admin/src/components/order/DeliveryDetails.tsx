/** @jsxRuntime classic */
import { css } from '@emotion/css';
import { controller } from '@keystone-6/core/fields/types/virtual/views';
import { FieldProps } from '@keystone-6/core/types';
import { Box, Stack, Text } from '@keystone-ui/core';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
import { DeliveryTypeEnum, OrderMetadata, SEDES } from '@smartfood/common';
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
        flex-direction: row !important;
        margin-top: 1rem;
        gap: 15px;
      `}
    >
      <Text
        className={css`
          font-weight: semibold !important;
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
  const info = value && isString(value) ? JSON.parse(value) : value;
  const metadata: OrderMetadata = info.metadata;
  console.log(metadata);

  const renderDirectionOrSede = () => {
    if (metadata.deliveryDetails.deliveryType === DeliveryTypeEnum.DELIVERY) {
      return (
        <>
          <DetailLineInfo
            label="Dirección:"
            value={metadata.deliveryDetails.direction}
          />
          <DetailLineInfo
            label="Referencia:"
            value={metadata.deliveryDetails.reference}
          />
        </>
      );
    } else {
      return (
        <DetailLineInfo
          label="Sede:"
          value={
            SEDES.find(
              (d) => d.id === (Number(metadata.deliveryDetails.sede) ?? 0),
            )?.name ?? ''
          }
        />
      );
    }
  };

  return (
    <Box>
      <FieldContainer>
        <FieldLabel>{field.label}</FieldLabel>
        <Box>
          {metadata?.deliveryDetails && (
            <>
              {renderDirectionOrSede()}
              <DetailLineInfo
                label={'Nommbre del cliente:'}
                value={metadata.deliveryDetails.name}
              />

              <DetailLineInfo
                label={'Apellido:'}
                value={metadata.deliveryDetails.lastName}
              />
              <DetailLineInfo
                label={'Teléfono:'}
                value={metadata.deliveryDetails.phone}
              />
            </>
          )}
          {/* <DetailLineInfo label="Dirección:" value={info.direction} />
        <DetailLineInfo label="Teléfono:" value={info.phone} /> */}
        </Box>
      </FieldContainer>
    </Box>
  );
};

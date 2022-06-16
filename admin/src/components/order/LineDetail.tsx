import { OrderLineItem } from '.keystone/types';
import { gql, useQuery } from '@keystone-6/core/admin-ui/apollo';
import { controller } from '@keystone-6/core/fields/types/relationship/views';
import { FieldProps } from '@keystone-6/core/types';
import { Button } from '@keystone-ui/button';
import { Stack, useTheme } from '@keystone-ui/core';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { CardContainer } from '../common';
import { PropertyLine, PropertySection } from '../common/PropertyShow';
type LineItem = OrderLineItem & {
  id: string;
  product: {
    id: string;
    name: string;
    price: string;
  };
};

const CardOrderLine: FC<{ line: LineItem }> = ({ line }) => {
  const { tones } = useTheme();
  const tone = tones['active'];
  const router = useRouter();
  return (
    <CardContainer>
      <PropertySection title="Producto">
        <PropertyLine label="Nombre:" value={line.product?.name} />
        <PropertyLine label="Precio:" value={line.product?.price} />
      </PropertySection>
      <PropertySection title="Detalle">
        <PropertyLine label="Cantidad:" value={line.quantity} />
        <PropertyLine label="Precio:" value={line.price} />
        <PropertyLine label="Total:" value={line.total} />
      </PropertySection>
      <Stack padding={'medium'}>
        <Button
          onClick={() => {
            router.push(`/order-lines/${line.id}`);
          }}
        >
          ver
        </Button>
      </Stack>
    </CardContainer>
  );
};

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) => {
  const ids = ((value as any).value ?? []).map((d) => d.id);

  const { data, error } = useQuery<{ orderLines: LineItem[] }>(
    gql`
      query ($ids: [ID!]!) {
        orderLines(where: { id: { in: $ids } }) {
          product {
            id
            name
            price
          }
          id
          quantity
          price
          total
          selection
        }
      }
    `,
    {
      variables: {
        ids: ids,
      },
    },
  );

  let detailOrders = (data?.orderLines || []).map((d) => (
    <CardOrderLine line={d} />
  ));

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <Stack
        as="ul"
        style={{
          listStyle: 'none',
          marginLeft: '-40px',
        }}
      >
        {detailOrders}
      </Stack>
    </FieldContainer>
  );
};

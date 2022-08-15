import { OrderLineItem } from '.keystone/types';
import { gql, useQuery } from '@keystone-6/core/admin-ui/apollo';
import { controller } from '@keystone-6/core/fields/types/relationship/views';
import { FieldProps } from '@keystone-6/core/types';
import { Button } from '@keystone-ui/button';
import { Stack, useTheme, Box, Text } from '@keystone-ui/core';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
import { DrawerController, Drawer } from '@keystone-ui/modals';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { CardContainer } from '../../common';
import { PropertyLine, PropertySection } from '../../common/PropertyShow';
import { useState } from 'react';
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
        <PropertyLine label="Precio:" value={`${line.price} S/.`} />
        <PropertyLine label="Total:" value={`${(line as any).total}S/.`} />
      </PropertySection>
      <Stack padding={'medium'}>
        {/* <Button
          onClick={() => {
            router.push(`/order-lines/${line.id}`);
          }}
        >
          ver
        </Button>
         */}
      </Stack>
    </CardContainer>
  );
};

const useOrderLinesQuery = () => {};

export const Field = ({ field, value }: FieldProps<typeof controller>) => {
  const ids = ((value as any).value ?? []).map((d) => d.id);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

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

  const detailOrders = (data?.orderLines || []).map((d) => (
    <CardOrderLine line={d} key={d.id} />
  ));
  const total = (data?.orderLines ?? []).reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0);

  const drawer = (
    <DrawerController isOpen={isOpenDrawer}>
      <Drawer
        title="Detalle"
        actions={{
          cancel: {
            action: () => {
              setIsOpenDrawer(false);
            },
            label: 'Cancelar',
          },
          confirm: {
            action: () => {},
            label: 'Cofirmar',
          },
        }}
      >
        <Box>
          <FieldContainer>
            <FieldLabel>Total:</FieldLabel>
            <Text marginY={'large'}>{total} S/.</Text>
          </FieldContainer>
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
        </Box>
      </Drawer>
    </DrawerController>
  );

  return (
    <FieldContainer>
      {drawer}
      <FieldLabel>Detalle de orden</FieldLabel>
      <Button
        weight="bold"
        tone="active"
        onClick={() => {
          setIsOpenDrawer(true);
        }}
      >
        Ver
      </Button>
    </FieldContainer>
  );
};

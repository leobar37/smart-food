import { ChakraProvider, useBoolean } from '@chakra-ui/react';
import { createContext } from '@chakra-ui/react-utils';
import { gql, useQuery } from '@keystone-6/core/admin-ui/apollo';
import { controller } from '@keystone-6/core/fields/types/relationship/views';
import { FieldProps } from '@keystone-6/core/types';
import { Button } from '@keystone-ui/button';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
import React from 'react';
import ItemsDrawer from './ItemsDrawer';
import { LineItem } from './types';
import { Provider } from './linesOrderContext';
const FieldLocal = ({ field, value }: FieldProps<typeof controller>) => {
  const ids = ((value as any).value ?? []).map((d) => d.id);
  const [isOpenDrawer, setIsOpenDrawer] = useBoolean(false);

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

  return (
    <Provider
      value={{
        orderLines: data?.orderLines,
        isOpenDrawer,
        setIsOpenDrawer,
      }}
    >
      <ItemsDrawer />
      <FieldContainer>
        <FieldLabel>Detalle de orden</FieldLabel>
        <Button weight="bold" tone="active" onClick={setIsOpenDrawer.on}>
          Ver
        </Button>
      </FieldContainer>
    </Provider>
  );
};

export const Field = ({ ...props }) => {
  return (
    <ChakraProvider>
      <FieldLocal {...(props as any)} />
    </ChakraProvider>
  );
};

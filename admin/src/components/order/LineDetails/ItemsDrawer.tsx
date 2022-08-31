import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
import React from 'react';
import CardOrderLine from './CardOrderLine';
import { useLinesContext } from './linesOrderContext';
const ItemsDrawer = () => {
  const { orderLines, isOpenDrawer, setIsOpenDrawer } = useLinesContext();
  const detailOrders = (orderLines || []).map((d) => (
    <CardOrderLine line={d} key={d.id} />
  ));
  const total = (orderLines ?? []).reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0);
  return (
    <Drawer isOpen={isOpenDrawer} onClose={setIsOpenDrawer.off}>
      <DrawerOverlay />
      <DrawerContent minWidth="30vw" pb="10">
        <DrawerCloseButton />
        <DrawerHeader>Detalle</DrawerHeader>
        <DrawerBody>
          <Stack>
            <FieldLabel>Total:</FieldLabel>
            <Text>{total} S/.</Text>
          </Stack>
          <FieldContainer>
            <FieldLabel>
              <Text fontSize={'lg'} mt="3">
                Lineas
              </Text>
            </FieldLabel>
            <Stack
              as="ul"
              style={{
                listStyle: 'none',
              }}
            >
              {detailOrders}
            </Stack>
          </FieldContainer>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ItemsDrawer;

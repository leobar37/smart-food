import React from 'react';

import {
  ListNavItems,
  NavigationContainer,
  NavItem,
} from '@keystone-6/core/admin-ui/components';
import { useKeystone } from '@keystone-6/core/admin-ui/context';
import { Box, Text, Divider, H5 } from '@keystone-ui/core';
import type { NavigationProps } from '@keystone-6/core/admin-ui/components';

const navMapper = {
  Negocio: {
    Client: 'Clientes',
    Product: 'Productos',
    Category: 'Categorias',
    Order: 'Pedidos',
  },
  Administración: {
    User: 'Usuarios',
  },
};
const makeDictionay = <T extends any>(arr: T[], key: keyof T) => {
  return arr.reduce((acc, curr) => {
    const name = curr[key];
    return {
      ...acc,
      [name as any]: curr,
    };
  }, {});
};

export function CustomNavigation({
  lists,
  authenticatedItem,
}: NavigationProps) {
  const navItems = makeDictionay(lists, 'key');

  const jsxItems = Object.keys(navMapper).map((section) => {
    const sectionItems = Object.keys(navMapper[section]).map((itemKey) => {
      const item = navItems[itemKey];
      const label = navMapper[section][itemKey];
      return (
        <NavItem
          key={itemKey}
          href={`/${(item?.label ?? ('' as string)).toLocaleLowerCase()}`}
        >
          {label}
        </NavItem>
      );
    });
    return (
      <Box key={section}>
        <Box paddingLeft={'xlarge'}>
          <H5>{section}</H5>
          <Divider />
        </Box>
        <Box marginTop={'medium'}>{sectionItems}</Box>
      </Box>
    );
  });
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      {jsxItems}
    </NavigationContainer>
  );
}

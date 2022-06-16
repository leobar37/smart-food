import { Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import {
  float,
  integer,
  json,
  password,
  relationship,
  select,
  text,
  timestamp,
} from '@keystone-6/core/fields';
import { PAYMENT_METHODS } from './constants';
import { cloudinaryField } from './libs/cloudinay';

enum OrderEnum {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
}
const ORDER_STATUS = [
  {
    label: 'Pendiente',
    value: OrderEnum.PENDING,
  },
  {
    label: 'Pagado',
    value: OrderEnum.PAID,
  },
  {
    label: 'Cancelado',
    value: OrderEnum.CANCELLED,
  },
  {
    label: 'Entregado',
    value: OrderEnum.DELIVERED,
  },
];
export const lists: Lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialColumns: ['name'],
      },
    },
  }),
  Client: list({
    ui: {
      labelField: 'name',
    },
    fields: {
      phone: text({
        validation: {
          isRequired: true,
        },
      }),
      name: text({
        validation: {
          isRequired: true,
        },
      }),
      lastName: text({
        validation: {
          isRequired: false,
        },
      }),
      direction: text(),
      email: text({
        validation: {
          isRequired: true,
        },
        isIndexed: 'unique',
      }),
      orders: relationship({ ref: 'Order.client', many: true }),
    },
  }),
  Product: list({
    fields: {
      photo: cloudinaryField({
        label: 'Product Image',
      }),
      name: text(),
      count: integer(),
      price: float(),
      category: relationship({ ref: 'Category.products', many: false }),
      options: relationship({ ref: 'Option.product', many: true }),
    },
    ui: {
      labelField: 'name',
    },
  }),
  Option: {
    description: 'SubOpciones de una opción',
    ui: {
      labelField: 'name',
    },
    fields: {
      name: text(),
      limit: integer(),
      label: text(),
      product: relationship({ ref: 'Product.options', many: false }),
      subOptions: relationship({ ref: 'SubOption.option', many: true }),
    },
  },
  SubOption: {
    fields: {
      name: text(),
      option: relationship({ ref: 'Option.subOptions', many: false }),
    },
  },
  Category: list({
    fields: {
      name: text(),
      products: relationship({ ref: 'Product.category', many: true }),
    },
  }),
  OrderLine: list({
    fields: {
      order: relationship({ ref: 'Order.lines', many: false }),
      product: relationship({ ref: 'Product', many: false }),
      quantity: integer(),
      price : float(),
      total : float(),
      selection: json({
        defaultValue: {},
      }),
    },
  }),
  Order: list({
    access : {
        operation : {
          create : () => false,
          delete : () => false,
          update :() => false,
          query : () => false
        }
    },
    fields: {
        
      createdAt: timestamp({
        defaultValue: {
          kind: 'now',
        },
      }),
      status: select({
        type : "enum",
        options: ORDER_STATUS,
        defaultValue: OrderEnum.PENDING,
        ui: {
          displayMode: 'select',
        },
      }),
      lines: relationship({ ref: 'OrderLine.order', many: true }),
      total: float(),
      client: relationship({ ref: 'Client.orders', many: false }),
      metadata: json({
        defaultValue: {},
      }),
      paymentMethod: select({
        type: 'enum',
        options: PAYMENT_METHODS,
        ui: {
          displayMode: 'select',
        },
      }),
    },
  }),
};

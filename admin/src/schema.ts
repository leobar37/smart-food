import { list } from '@keystone-6/core';
import {
  password,
  relationship,
  text,
  checkbox,
  integer,
  float,
} from '@keystone-6/core/fields';
import { cloudinaryField } from './libs/cloudinay';
import { Lists } from '.keystone/types';

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
          isRequired: false,
        },
      }),
    },
  }),
  Product: list({
    fields: {
      photo: cloudinaryField,
      name: text(),
      canCount: checkbox(),
      count: integer(),
      price: float(),
      category: relationship({ ref: 'Category.products', many: false }),
      options: relationship({ ref: 'Option.product', many: true }),
    },
  }),
  Option: {
    fields: {
      name: text(),
      limit: integer(),
      product: relationship({ ref: 'Product.options', many: false }),
      subOptions: relationship({ ref: 'SubOption.product', many: true }),
    },
  },
  SubOption: {
    fields: {
      name: text(),
      product: relationship({ ref: 'Option.subOptions', many: false }),
    },
  },
  Category: list({
    fields: {
      name: text(),
      products: relationship({ ref: 'Product.category', many: true }),
    },
  }),
};

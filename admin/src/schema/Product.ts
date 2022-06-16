import { list } from '@keystone-6/core';
import { float, integer, relationship, text } from '@keystone-6/core/fields';
import { cloudinaryField } from '../libs/cloudinay';

export const Product = list({
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
});

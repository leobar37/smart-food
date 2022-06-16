import { list } from '@keystone-6/core';
import {
    relationship, text
} from '@keystone-6/core/fields';


export const Category = list({
    fields: {
      name: text(),
      products: relationship({ ref: 'Product.category', many: true }),
    },
  });
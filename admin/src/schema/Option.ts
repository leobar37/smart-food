import { list } from '@keystone-6/core';
import {
    integer, relationship, text
} from '@keystone-6/core/fields';

export const Option = list({
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
});

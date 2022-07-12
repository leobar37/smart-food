import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';

export const Category = list({
  access: {
    operation: {
      create: (...args) => {
        return true;
      },
      query: (...args) => {
        return true;
      },
    },
  },
  description: 'Categoria',
  fields: {
    name: text(),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    title: text(),
    products: relationship({ ref: 'Product.category', many: true }),
  },
});

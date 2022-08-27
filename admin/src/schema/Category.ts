import { list } from '@keystone-6/core';
import { relationship, text, checkbox } from '@keystone-6/core/fields';

export const Category = list({
  access: {
    operation: {
      create: (...args) => {
        console.log('create category');

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
    title: text(),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    isVisible: checkbox({
      defaultValue: true,
    }),
    products: relationship({ ref: 'Product.category', many: true }),
  },
});

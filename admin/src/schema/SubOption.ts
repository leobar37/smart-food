import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';

export const SubOption = list({
  fields: {
    name: text(),
    option: relationship({ ref: 'Option.subOptions', many: false }),
  },
});

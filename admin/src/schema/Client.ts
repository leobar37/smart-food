import { list } from '@keystone-6/core';
import {
    relationship, text
} from '@keystone-6/core/fields';

export const Client = list({
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
  })


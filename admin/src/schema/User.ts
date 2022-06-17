import { list } from '@keystone-6/core';
import { password, text, select } from '@keystone-6/core/fields';
import { Rol} from '../types'
import { rules} from '../access'
export const User = list({
  access : {
   operation : rules.completeOperation(Rol.ADMIN)
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    rol: select({
      type: 'enum',
      options: [
        {
          label: 'Admin',
          value: Rol.ADMIN,
        },
        {
          label: 'Staff',
          value: Rol.STAFF,
        },
      ],
    }),
    password: password({ validation: { isRequired: true } }),
  },
  ui: {
    listView: {
      initialColumns: ['name'],
    },
  },
});

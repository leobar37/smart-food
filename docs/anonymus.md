## Anonymus user

El sistema por defecto crea un usuario por defecto al cual se le otorgan todas
las ordenes que no tienen un cliente.

```ts
export const AnonymusClient = {
  direction: 'no tiene',
  email: 'anonymus@anon.com',
  lastName: 'Anonymus',
  name: 'Anonymus',
  phone: '123456789',
} as ClientCreateInput;
```

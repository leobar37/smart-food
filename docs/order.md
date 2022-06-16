# Creación de order

## CLient (email)

El correo del cliente a quien se le atribuye 
la orden, este campo no es obligatorio y si no existe,
se le atribuye a un cliente anonimo



## Datos de envio (metadata)

Se manda la dirección a donde se enviará este pedio

**Dirección**
**Telefono:** Si el cliente no es anonimo

## Metodo de pago

## Order Line

### Cantidad del producto (count)

### Precio del producto(price)

Precio final del producto


## Order status

**Created:**

S



**Anonymus user**

El sistema  crea un usuario por defecto al cual se le otorgan todas
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


# Smart food

- El usuario puede armar su plato, y puede comprar platos prearmados
- Tambien podemos vender otros productos que no se pueden armar, como bebidas

- Mandar el pedido, cuando el usuario termina de hacer su pedido, este se puede enviar a whatsApp
  para al un número para que pueda empezar su preparación.

## Plato armable / Producto Normal:

**Atributos:**

- Nombre: Nombre del plato
- Precio: Precio al que se puede vender el plato
- Fotos : Foto del plato a formar
- Categoria: Podemos agrupar los platos por categorias
- Count : Cantidad disponible
- se puede contar : No tenmos un inventario definido para los platos armables por ejempo, por eso necesitamos
  un atributo que diga cuando son o no contables

## Opciones:

Si un plato es armable, puede tener varias opciones

**Atributos**

Nombre: Nombre la opción
opciones: Una opción puede tener varias opciones
limite: El limite de la cantidad de opciones que puedo escojer.
orden: Orden en el cual puede aparecer esta opción, valido si tiene opciones a escoger (osea es de primer nivel)

## Cliente:

Por ahora lo unico que nos interesa del cliente es

**Atributos**

- Nombres(Obligatorio): Nombre por el cual quiere que lo llamen
- Dirección(Dirección): Dirección a donde se le entregan los pedidos
- Email(opcional): Si el cliente ingresa su email, smart food puede enviarle descuentos y promociones
- Número de teléfono: Para poder contactarnos con el cliente.

## Order:

La orden muestra el detalle de la venta que se realizo

**Atributos:**

- Productos[]: Todos los productos que eligio el cliente.
- fecha : Fecha en que se realizo la venta.
- cliente: EL cliente a quien se le hizo esta venta.
- metodo de pago: El metodo de pago con el cual pago
- total : El total del valor de la venta

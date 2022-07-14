# Add To Cart

## Carrito

Un carrito debe llevar la relación entre un producto y el cliente incluyendo otros
atributos como cantidad.

- Cantidad
- Plato
- CLiente

## Funcionalidades

- Agregar una linea : la linea es la relación entre, producto y orden, si es la primera linea, se crea el carrito
- Editar una linea : Una vez creada, se puede editar una linea

  - La cantidad : Si la linea llega a cero, se remueve esta linea de la orden

- Simple Storage: Se tiene que llevar el tracking del lado del usuario, la liberia SDK, es para ambiente browser y node js,
  por ende cada uno debe tener una manera de poder almacenar información.

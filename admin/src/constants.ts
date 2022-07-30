export enum OrderEnum {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
  IN_CART = 'IN_CART',
}

export const ORDER_STATUS = [
  {
    label: 'Pendiente',
    value: OrderEnum.PENDING,
  },
  {
    label: 'Pagado',
    value: OrderEnum.PAID,
  },
  {
    label: 'Cancelado',
    value: OrderEnum.CANCELLED,
  },
  {
    label: 'Entregado',
    value: OrderEnum.DELIVERED,
  },
  {
    label: 'En carrito',
    value: OrderEnum.IN_CART,
  },
];

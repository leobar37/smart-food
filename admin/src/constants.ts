import { PaymentMethods } from './types';

export const PAYMENT_METHODS = [
  { value: PaymentMethods.CASH, label: 'Efectivo' },
  {
    value: PaymentMethods.CREDIT_CARD,
    label: 'Tarjeta de crédito',
  },
  {
    value: PaymentMethods.PLIN,
    label: 'Plin',
  },
  {
    value: PaymentMethods.YAPE,
    label: 'Yape',
  },
];

export enum OrderEnum {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
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
];
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

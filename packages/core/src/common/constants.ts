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

export const SUPABASE_TABLES = {
  CLIENT: 'Client',
  OPTIONS: 'Options',
  ORDER: 'Order',
  BUILDEABLE_PRODUCT: 'product_for_build',
};

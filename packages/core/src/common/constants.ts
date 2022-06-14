import { PaymentMethods } from './types';

export const PAYMENT_METHODS = {
  selection: [
    {
      label: 'Plin',
      id: PaymentMethods.PLIM,
    },
    {
      label: 'Yape',
      id: PaymentMethods.YAPE,
    },
  ],
};

export const SUPABASE_TABLES = {
  CLIENT: 'Client',
  OPTIONS: 'Options',
  ORDER: 'Order',
  BUILDEABLE_PRODUCT: 'product_for_build',
};

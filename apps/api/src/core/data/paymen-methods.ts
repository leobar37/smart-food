export enum PaymentMethods {
  PLIM = 'PLIN',
  YAPE = 'YAPE',
}
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

type Sede = {
  id: number;
  name: string;
};
export const SEDES: Sede[] = [
  {
    id: 1,
    name: 'Leguía',
  },
  {
    id: 2,
    name: 'Élite',
  },
];

export enum PaymentMethods {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  YAPE = 'YAPE',
  PLIN = 'PLIN',
}

export const PAYMENT_METHODS = [
  { value: PaymentMethods.CASH, label: 'Efectivo' },
  {
    value: PaymentMethods.CREDIT_CARD,
    label: 'Tarjeta',
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

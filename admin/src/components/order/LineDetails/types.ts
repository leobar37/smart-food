import { OrderLineItem } from '.keystone/types';

export type LineItem = OrderLineItem & {
    id: string;
    product: {
      id: string;
      name: string;
      price: string;
    };
  };
  
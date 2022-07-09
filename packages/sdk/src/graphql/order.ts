import { gql } from 'graphql-request';
const orderFragment = gql`
  fragment OrderFragement on Order {
    id
    createdAt
    paymentMethod
    total
    metadata
    status
    orderNumber
    lines {
      id
      quantity
      price
      total
    }
  }
`;

export enum OrderPaymentMethodType {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  PLIN = 'PLIN',
  YAPE = 'YAPE',
}

type Operation = 'create';

export type OrderMetadata = {
  direction: string;
  phone: string;
};

export type OrderLine = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  total: number;
  selection: any;
};

export type Order = {
  id: string;
  createdAt: Date;
  paymentMethod: OrderPaymentMethodType;
  total: number;
  metadata: OrderMetadata;
  status: string;
  lines: OrderLine[];
  orderNumber: number;
};

export type CreateOrderArgs = {
  email?: string;
  orderId?: string;
  metadata?: {
    direction?: string;
    phone?: string;
    payment?: OrderPaymentMethodType;
  };
};

export type PatchOrderLineArgs = {
  orderId: string;
  orderLineId?: string;
  orderLine: {
    productId: string;
    quantity?: number;
    price?: number;
    total?: number;
    selection?: any;
  };
};

export type DeleteOrderLineArgs = {
  orderId: string;
  lineOrderId: string;
};

export const buildOrderLineDocument = () => {
  return gql`
    ${orderFragment}
    mutation patchOrderLine(
      $orderId: String
      $orderLineId: String
      $orderLine: OrderLineItem
    ) {
      patchOrderLine(
        orderId: $orderId
        orderLineId: $orderLineId
        orderLine: $orderLine
      ) {
        ...OrderFragement
      }
    }
  `;
};

export const buildDeleteOrderLineDocument = () => {
  return gql`
    ${orderFragment}
    mutation deleteOrderLine($orderId: String, $lineOrderId: String) {
      customDeleteOrderLine(orderId: $orderId, lineOrderId: $lineOrderId) {
        ...OrderFragement
      }
    }
  `;
};

export function buildGetOrderDocument(operation: Operation) {
  switch (operation) {
    case 'create': {
      return gql`
        ${orderFragment}
        mutation createOrder($metadata: Metadata, $email: String) {
          makeOrder(metadata: $metadata, email: $email) {
            ...OrderFragement
          }
        }
      `;
    }
  }
}

const orderFragment = `
fragment OrderFragement on Order {
    id 
       createdAt
       paymentMethod
       total
       metadata
       status
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
};

export type CreateArgs = {
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
  orderLineId : string;
  orderLine : {
     productId : string;
      quantity : number;
      price : number;
      total : number;
      selection : any;
  } 
}

export type DeleteOrderLineArgs = {
  orderId: string;
  lineOrderId : string;
}

export const buildOrderLineDocument = () => {
  return `
  ${orderFragment}
   mutation patchOrderLine($orderId: String, $orderLineId: String , $orderLine: OrderLineItem) {
       patchOrderLine( orderId :  $orderId  , orderLineId  : $orderLineId ,  orderLine: $orderLine) {
       ...OrderFragement
       }
  }
  `;
};

export const buildDeleteOrderLineDocument = () => {
  return `
  ${orderFragment}
  mutation deleteOrderLine ($orderId: String, $lineOrderId: String  ){
    customDeleteOrderLine(orderId : $orderId ,  lineOrderId : $lineOrderId){
       ...OrderFragement
    }
    
  }
  `
}

export function buildGetOrderDocument(operation: Operation) {
  switch (operation) {
    case 'create': {
      return `
        ${orderFragment}
        mutation createOrder($metadata:Metadata  , $email : String) {
            makeOrder( metadata : $metadata , email  : $email) {
             ...OrderFragement
            }  
          }
          
        `;
    }
  }
}

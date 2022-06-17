
import { KeystoneListsAPI} from '@keystone-6/core/types'
export type Session = {
  itemId: string;
  listKey: string;
  data: {
    id: string;
    name: string;
    rol: string;
    email: string;
  };
};

export type ListApi = KeystoneListsAPI<any>;

export type AccessArgs = {
    session?: Session;
}

export enum Rol {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
}

export enum PaymentMethods {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  YAPE = 'YAPE',
  PLIN = 'PLIN',
}


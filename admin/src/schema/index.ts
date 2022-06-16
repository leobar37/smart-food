import { Lists } from '.keystone/types';
import { Category } from './Category';
import { Client } from './Client';
import { Option } from './Option';
import { Order } from './Order';
import { OrderLine } from './OrderLine';
import { Product } from './Product';
import { SubOption } from './SubOption';
import { User } from './User';
export const lists: Lists = {
  User,
  Client,
  Product,
  Option,
  SubOption,
  Category,
  OrderLine,
  Order,
};

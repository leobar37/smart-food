export interface BuildeableProduct {
  id?: number;
  created_at?: Date;
  name: string;
  price: number;
  options: Option[];
}

export interface Option {
  id?: number;
  created_at?: Date;
  label?: string;
  name: string;
  options?: Option[];
  limit?: number;
  optionsId?: number;
  productId?: number;
}

export interface Order {
  productId: string;
  options: Record<string, string>[];
}

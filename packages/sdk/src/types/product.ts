export interface Product {
  id: string;
  photo: Photo;
  options: Option[];
  name: string;
  price: number;
  count: null;
}

export interface Option {
  id: string;
  name: string;
  limit: number;
  label:  string;
  subOptions: SubOption[];
}

export interface SubOption {
  id: string;
  name: string;
}

export interface Photo {
  publicUrl: string;
  publicUrlTransformed: string;
  originalFilename: string;
  filename: string;
  id: string;
}

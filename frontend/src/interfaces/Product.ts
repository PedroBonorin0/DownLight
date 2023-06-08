export interface ProductNoId {
  name: string;
  price: number;
  amount: number;
}

export interface Product extends ProductNoId {
  id: string;
}
export interface ServiceNoId {
  name: string;
  price: number;
}

export interface Service extends ServiceNoId {
  id: string;
}
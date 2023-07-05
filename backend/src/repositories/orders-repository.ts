import { Order, Priority } from "@prisma/client";

export interface OrderCreateInput {
  description: string;
  paid: boolean;
  car_info: string;
  budget: number;
  priority: Priority;
  deadline: Date | null;

  products: string[]
  services: string[]
  status_id: string

}

export interface OrdersRepository {
  findAll(): Promise<Order[]>;
  create(data: OrderCreateInput): Promise<Order>;

  //edit(data: { name: string; price: number; amount: number; id: string }): Promise<Order>;
  //delete(id: string): Promise<void>;
}

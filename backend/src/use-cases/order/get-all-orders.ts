import { OrdersRepository } from "@/repositories/orders-repository";
import { Order } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetAllOrderUseCaseResponse {
  orders: Order[];
}

export class GetAllOrderUseCase {
  constructor(private orderRepository: OrdersRepository) { }

  async execute(): Promise<GetAllOrderUseCaseResponse> {
    const orders = await this.orderRepository.findAll();

    if (!orders) {
      throw new ResourceNotFoundError();
    }

    return {
      orders,
    };
  }
}

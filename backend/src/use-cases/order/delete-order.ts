import { OrdersRepository } from "@/repositories/orders-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteOrderUseCaseRequest {
  id: string;
}

export class DeleteOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) { }

  async execute({ id }: DeleteOrderUseCaseRequest): Promise<void> {

    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new ResourceNotFoundError();
    }

    await this.ordersRepository.delete(id);

    return;
  }
}

import { OrdersRepository } from "@/repositories/orders-repository";
import { Order, Priority } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

interface CreateOrderUseCaseRequest {
  description: string
  budget: number
  carInfo: string
  deadline: Date | null
  paid: boolean
  priority: Priority
  products: string[]
  services: string[]
  status: string
}

interface CreateOrderUseCaseResponse {
  order: Order;
}

export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) { }

  async execute({
    budget, carInfo, deadline, description, paid, priority, products, services, status
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {

    const order = await this.ordersRepository.create(
      {
        description,
        budget,
        car_info: carInfo,
        deadline,
        paid,
        priority,
        products,
        services,
        status_id: status
      });

    if (!order) {
      throw new ResourceNotFoundError();
    }

    return {
      order,
    };
  }
}

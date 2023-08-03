import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { CreateOrderUseCase } from "@/use-cases/order/create-order";
import { DeleteOrderUseCase } from "@/use-cases/order/delete-order";
import { GetAllOrderUseCase } from "@/use-cases/order/get-all-orders";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createOrder(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createOrderBodySchema = z.object({
    description: z.string(),
    paid: z.boolean().default(false),
    carInfo: z.string(),
    budget: z.number(),
    priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).default('LOW'),
    deadline: z.date().nullable().default(null),

    status: z.string().uuid(),
    services: z.array(z.string().uuid()),
    products: z.array(z.string().uuid()).default([])
  });

  const {
    description,
    budget,
    carInfo,
    deadline,
    paid,
    priority,
    products,
    services,
    status
  } = createOrderBodySchema.parse(request.body);

  try {
    const OrdersRepository = new PrismaOrdersRepository();
    const createOrderUseCase = new CreateOrderUseCase(OrdersRepository);

    await createOrderUseCase.execute({
      description,
      budget,
      carInfo,
      deadline,
      paid,
      priority,
      products,
      services,
      status
    });
  } catch (err) {
    throw err;
  }

  return reply.status(201).send();
}

export async function listAllOrders(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const orderRepository = new PrismaOrdersRepository();
  const getAllOrdersUseCase = new GetAllOrderUseCase(orderRepository);

  const { orders } = await getAllOrdersUseCase.execute();

  return reply.status(200).send(orders);
}

export async function deleteOrder(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteOrdersParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteOrdersParamsSchema.parse(request.params);

  try {
    const ordersRepository = new PrismaOrdersRepository();
    const deleteOrdersUseCase = new DeleteOrderUseCase(ordersRepository);

    await deleteOrdersUseCase.execute({
      id,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}
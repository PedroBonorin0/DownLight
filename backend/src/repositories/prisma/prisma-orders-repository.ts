import { prisma } from "@/lib/prisma";
import { OrderCreateInput, OrdersRepository } from "../orders-repository";
import { Order } from "@prisma/client";

export class PrismaOrdersRepository implements OrdersRepository {
  async findById(id: string): Promise<Order | null> {

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    return order;
  }
  async delete(id: string): Promise<void> {

    await prisma.order.delete({
      where: { id },
    });

    return;
  }
  async findAll(): Promise<Order[]> {
    const allOrders = await prisma.order.findMany({
      orderBy: { created_at: "desc" },
      include: {
        services: {
          select: {
            service: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    return allOrders;
  }
  async create(data: OrderCreateInput) {

    const {
      budget,
      car_info,
      description,
      deadline,
      paid,
      priority,
      products,
      services,
      status_id } = data;

    const order = await prisma.order.create({
      data: {
        budget,
        car_info,
        description,
        deadline,
        paid,
        priority,
        status: {
          connect: { id: status_id }
        },
        products: {
          create: products.map((product_id) => {
            return { product: { connect: { id: product_id } } }
          })
        },
        services: {
          create: services.map((service_id) => {
            return { service: { connect: { id: service_id } } }
          })
        }

      }
    });

    return order;
  }
}

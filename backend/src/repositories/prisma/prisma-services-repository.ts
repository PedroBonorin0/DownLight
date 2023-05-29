import { prisma } from "@/lib/prisma";
import { Prisma, Service } from "@prisma/client";
import { ServicesRepository } from "../services-repository";

export class PrismaServicesRepository implements ServicesRepository {
  async findAll() {
    const allServices = await prisma.service.findMany();

    return allServices;
  }

  async create(data: Prisma.ServiceCreateInput) {
    const service = await prisma.service.create({
      data,
    });

    return service;
  }

  async edit(data: { name: string; price: number; id: string }) {
    const service = await prisma.service.update({
      where: { id: data.id },
      data: {
        name: data.name,
        price: data.price,
      },
    });

    return service;
  }

  async delete(id: string) {
    await prisma.service.delete({
      where: { id },
    });

    return;
  }
  async findByName(name: string) {
    const service = await prisma.service.findUnique({
      where: { name },
    });

    return service;
  }

  async findByNameAndIdNotEqual(name: string, id: string) {
    const service = await prisma.service.findUnique({
      where: {
        name,
      },
    });

    if (service?.id === id) {
      return null;
    }
    return service;
  }

  async findById(id: string) {
    const service = await prisma.service.findUnique({
      where: {
        id,
      },
    });

    return service;
  }
}

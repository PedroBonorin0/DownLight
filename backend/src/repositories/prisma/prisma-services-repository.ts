import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
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
}

import { Prisma, Service } from "@prisma/client";

export interface ServicesRepository {
  findAll(): Promise<Service>;
  create(data: Prisma.ServiceCreateInput): Promise<Service>;
}

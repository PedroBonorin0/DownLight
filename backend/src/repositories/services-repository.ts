import { Prisma, Service } from "@prisma/client";

export interface ServicesRepository {
  findAll(): Promise<Service[]>;
  create(data: Prisma.ServiceCreateInput): Promise<Service>;
  edit(data: { name: string; price: number; id: string }): Promise<Service>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Service | null>;
  findByNameAndIdNotEqual(name: string, id: string): Promise<Service | null>;
  findById(id: string): Promise<Service | null>;
}

import { Prisma, Product } from "@prisma/client";

export interface ProductsRepository {
  findAll(): Promise<Product[]>;
  create(data: Prisma.ProductCreateInput): Promise<Product>;
  edit(data: { name: string; price: number; amount: number; id: string }): Promise<Product>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Product | null>;
  findByNameAndIdNotEqual(name: string, id: string): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
}

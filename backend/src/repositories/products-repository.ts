import { Category, Prisma, Product } from "@prisma/client";

export interface ProductCreateInput {
  name: string,
  price: number,
  amount: number,
  categories: string[]
}

export interface ProductEditInput {
  id:string,
  name: string,
  price: number,
  amount: number,
  categoriesToAdd: string[]
  categoriesToRemove: string[]
}

export interface ProductsRepository {
  findAll(): Promise<Product[]>;
  create(data: ProductCreateInput): Promise<Product>;
  edit(data: ProductEditInput): Promise<Product>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Product | null>;
  findByNameAndIdNotEqual(name: string, id: string): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
  findRelatedCategories(id:string): Promise<string[]>
}

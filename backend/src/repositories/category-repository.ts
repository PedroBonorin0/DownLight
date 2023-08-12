import { Category, Prisma } from "@prisma/client";

export interface CategoryRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>;
  findByName(name: string): Promise<Category | null>
  findAll(): Promise<Category[]>
  findById(id:string): Promise<Category | null>
  delete(id:string):Promise<void>
  findByNameAndIdNotEqual(name: string, id: string): Promise<Category | null>;
  edit(data: { name: string; id: string }): Promise<Category>;
  findAllByIds(ids: string[]): Promise<Category[]>
}

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CategoryRepository } from "../category-repository";


export class PrismaCategoryRepository implements CategoryRepository {
  async findAll() {
    const allCategories = await prisma.category.findMany({
      orderBy: { created_at: "desc" },
    });

    return allCategories;
  }

  async create(data: Prisma.CategoryCreateInput) {
    const category = await prisma.category.create({
      data,
    });

    return category;
  }

  async edit(data: { name: string; id: string }) {
    const category = await prisma.category.update({
      where: { id: data.id },
      data: {
        name: data.name,
      },
    });

    return category;
  }

  async delete(id: string) {
    await prisma.category.delete({
      where: { id },
    });

    return;
  }

  async findByName(name: string) {
    const category = await prisma.category.findUnique({
      where: { name },
    });

    return category;
  }

  async findByNameAndIdNotEqual(name: string, id: string) {
    const category = await prisma.category.findUnique({
      where: {
        name,
      },
    });

    if (category?.id === id) {
      return null;
    }
    return category;
  }

  async findById(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  }
}

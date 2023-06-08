import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ProductsRepository } from "../products-repository";

export class PrismaProductsRepository implements ProductsRepository {
  async findAll() {
    const allProducts = await prisma.product.findMany({
      orderBy: { created_at: "desc" },
    });

    return allProducts;
  }

  async create(data: Prisma.ProductCreateInput) {
    const product = await prisma.product.create({
      data,
    });

    return product;
  }

  async edit(data: { name: string; price: number; amount: number; id: string }) {
    const product = await prisma.product.update({
      where: { id: data.id },
      data: {
        name: data.name,
        price: data.price,
        amount: data.amount
      },
    });

    return product;
  }

  async delete(id: string) {
    await prisma.product.delete({
      where: { id },
    });

    return;
  }

  async findByName(name: string) {
    const product = await prisma.product.findUnique({
      where: { name },
    });

    return product;
  }

  async findByNameAndIdNotEqual(name: string, id: string) {
    const product = await prisma.product.findUnique({
      where: {
        name,
      },
    });

    if (product?.id === id) {
      return null;
    }
    return product;
  }

  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    return product;
  }
}

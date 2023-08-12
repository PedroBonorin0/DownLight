import { prisma } from "@/lib/prisma";
import { Category, Prisma } from "@prisma/client";
import { ProductCreateInput, ProductEditInput, ProductsRepository } from "../products-repository";

export class PrismaProductsRepository implements ProductsRepository {
  async findAll() {
    const allProducts = await prisma.product.findMany({
      orderBy: { created_at: "desc" },
      include: {categories:true}
    });

    return allProducts;
  }

  async create(data: ProductCreateInput) {
    
    const {
      name,
      price,
      amount,
      categories } = data;

    const product = await prisma.product.create({
      data: {
        name,
        price,
        amount,
        categories: {
          create: categories.map((category_id) => {
            return { category: { connect: { id: category_id } } }
          })
        },
      }
    });

    return product;
  }

  async edit(data: ProductEditInput) {
    const product = await prisma.product.update({
      where: { id: data.id },
      data: {
        name: data.name,
        price: data.price,
        amount: data.amount,
        categories: {
          create: data.categoriesToAdd.map((category_id) => {
            return { category: { connect: { id: category_id } } }
          }),
          deleteMany: {
            category_id: {
              in: data.categoriesToRemove
            }
          }
        },
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
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    });

    return product;
  }
  
  async findRelatedCategories(id: string) {
    const categories = await prisma.category.findMany({
     where: {
      products: {
        some: {
          product_id: id
        }
      }
     },
     select: {
      id:true
     }
    })
    
    if(!categories){
      return []
    }

    const categoryArray = categories.map(category=>{
      return category.id
    })

    return categoryArray
  }

}

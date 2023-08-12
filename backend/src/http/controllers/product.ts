import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ProductAlreadyExistsError } from "@/use-cases/errors/product-already-exists-error";
import { CreateProductUseCase } from "@/use-cases/product/create-product";
import { GetAllProductsUseCase } from "@/use-cases/product/get-all-products";
import { EditProductUseCase } from "@/use-cases/product/edit-product";
import { DeleteProductUseCase } from "@/use-cases/product/delete-product";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { PrismaCategoryRepository } from "@/repositories/prisma/prisma-category-repository";

export async function listAllProducts(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const productsRepository = new PrismaProductsRepository();
  const createProductUseCase = new GetAllProductsUseCase(productsRepository);

  const { products } = await createProductUseCase.execute();

  return reply.status(200).send(products);
}

export async function createProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createProductBodySchema = z.object({
    name: z.string(),
    price: z.number(),
    amount: z.number(),
    categories: z.array(z.string().uuid()).default([])
  });

  const { name, price, amount, categories } = createProductBodySchema.parse(request.body);

  try {
    const productsRepository = new PrismaProductsRepository();
    const categoryRepository = new PrismaCategoryRepository();
    const createProductUseCase = new CreateProductUseCase(productsRepository, categoryRepository);

    await createProductUseCase.execute({
      name,
      price,
      amount,
      categories
    });
  } catch (err) {
    if (err instanceof ProductAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    if(err instanceof ResourceNotFoundError){
      return reply.status(400).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}

export async function editProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const editProductBodySchema = z.object({
    name: z.string(),
    price: z.number(),
    amount: z.number(),
    categories: z.array(z.string().uuid()).default([])
  });

  const editProductParamsSchema = z.object({
    id: z.string(),
  });

  const { name, price, amount, categories } = editProductBodySchema.parse(request.body);

  const { id } = editProductParamsSchema.parse(request.params);

  try {
    const productsRepository = new PrismaProductsRepository();
    const categoryRepository = new PrismaCategoryRepository();
    const editProductUseCase = new EditProductUseCase(productsRepository,categoryRepository);

    await editProductUseCase.execute({
      name,
      price,
      amount,
      id,
      categories
    });
  } catch (err) {
    if (err instanceof ProductAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    if(err instanceof ResourceNotFoundError){
      return reply.status(400).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}

export async function deleteProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteProductParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteProductParamsSchema.parse(request.params);

  try {
    const servicesRepository = new PrismaProductsRepository();
    const deleteProductUseCase = new DeleteProductUseCase(servicesRepository);

    await deleteProductUseCase.execute({
      id,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}

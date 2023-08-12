import { PrismaCategoryRepository } from "@/repositories/prisma/prisma-category-repository";
import { CreateCategoryUseCase } from "@/use-cases/category/create-category";
import { DeleteCategoryUseCase } from "@/use-cases/category/delete-category";
import { EditCategoryUseCase } from "@/use-cases/category/edit-category";
import { GetAllCategoryUseCase } from "@/use-cases/category/get-all-categories";
import { CategoryAlreadyExistsError } from "@/use-cases/errors/category-already-exists";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";


export async function listAllCategories(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const categoryRepository = new PrismaCategoryRepository();
  const getAllCategoriesUseCase = new GetAllCategoryUseCase(categoryRepository);

  const { categories } = await getAllCategoriesUseCase.execute();

  return reply.status(200).send(categories);
}

export async function createCategory(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createCategoryBodySchema = z.object({
    name: z.string(),
  });

  const { name } = createCategoryBodySchema.parse(request.body);

  try {
    const categoryRepository = new PrismaCategoryRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

    await createCategoryUseCase.execute({
      name,
    });
  } catch (err) {
    if (err instanceof CategoryAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}

export async function editCategory(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const editCategoryBodySchema = z.object({
    name: z.string(),
  });

  const editCategoryParamsSchema = z.object({
    id: z.string(),
  });

  const { name } = editCategoryBodySchema.parse(request.body);

  const { id } = editCategoryParamsSchema.parse(request.params);

  try {
    const categoryRepository = new PrismaCategoryRepository();
    const editCategoryUseCase = new EditCategoryUseCase(categoryRepository);

    await editCategoryUseCase.execute({
      name,
      id,
    });
  } catch (err) {
    if (err instanceof CategoryAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}

export async function deleteCategory(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteCategoryParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteCategoryParamsSchema.parse(request.params);

  try {
    const categoryRepository = new PrismaCategoryRepository();
    const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);

    await deleteCategoryUseCase.execute({
      id,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}

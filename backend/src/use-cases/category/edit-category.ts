
import { CategoryRepository } from "@/repositories/category-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { Category } from "@prisma/client";
import { CategoryAlreadyExistsError } from "../errors/category-already-exists";

interface EditCategoryUseCaseRequest {
  name: string;
  id: string;
}

interface EditCategoryUseCaseResponse {
  category: Category;
}

export class EditCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) { }

  async execute({
    name,
    id,
  }: EditCategoryUseCaseRequest): Promise<EditCategoryUseCaseResponse> {
    const categoryExists = await this.categoryRepository.findById(id);

    if (!categoryExists) {
      throw new ResourceNotFoundError();
    }

    const categoryWithSameName =
      await this.categoryRepository.findByNameAndIdNotEqual(name, id);

    if (categoryWithSameName) {
      throw new CategoryAlreadyExistsError();
    }

    const category = await this.categoryRepository.edit({ name, id });

    return {
      category,
    };
  }
}

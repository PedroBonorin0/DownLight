import { CategoryRepository } from "@/repositories/category-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteCategoryUseCaseRequest {
  id: string;
}

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) { }

  async execute({ id }: DeleteCategoryUseCaseRequest): Promise<void> {
    const product = await this.categoryRepository.findById(id);

    if (!product) {
      throw new ResourceNotFoundError();
    }

    await this.categoryRepository.delete(id);

    return;
  }
}

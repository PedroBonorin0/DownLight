
import { CategoryRepository } from "@/repositories/category-repository";
import { Category } from "@prisma/client";

interface GetAllCategoryUseCaseResponse {
  categories: Category[];
}

export class GetAllCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) { }

  async execute(): Promise<GetAllCategoryUseCaseResponse> {

    const categories = await this.categoryRepository.findAll();

    return {
      categories,
    };
  }
}

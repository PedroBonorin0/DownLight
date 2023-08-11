import { CategoryRepository } from "@/repositories/category-repository";
import { Category } from "@prisma/client";
import { CategoryAlreadyExistsError } from "../errors/category-already-exists";

interface GetCategoryUseCaseRequest {
  name:string,
}

interface CreateCategoryUseCaseResponse {
  category: Category;
}

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) { }

  async execute({
    name,
  }: GetCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {


    const categoryWithSameName = await this.categoryRepository.findByName(name);

    if (categoryWithSameName) {
      throw new CategoryAlreadyExistsError();
    }
    const category = await this.categoryRepository.create({ name });

    return {
      category,
    };
  }
}

import { ProductsRepository } from "@/repositories/products-repository";
import { Product } from "@prisma/client";
import { ProductAlreadyExistsError } from "../errors/product-already-exists-error";
import { CategoryRepository } from "@/repositories/category-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreateProductUseCaseRequest {
  name: string;
  price: number;
  amount: number;
  categories: string[]
}

interface CreateProductUseCaseResponse {
  product: Product;
}

export class CreateProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private categoryRepository: CategoryRepository
    ) { }

  async execute({
    name,
    price,
    amount,
    categories
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const productWithSameName = await this.productsRepository.findByName(name);

    if (productWithSameName) {
      throw new ProductAlreadyExistsError();
    }

    const categoriesSelected = await this.categoryRepository.findAllByIds(categories)

    if(categoriesSelected.length < categories.length){
      throw new ResourceNotFoundError()
    }

    const product = await this.productsRepository.create({ name, price, amount, categories });

    return {
      product,
    };
  }
}

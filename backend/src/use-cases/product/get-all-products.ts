import { Product } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { ProductsRepository } from "@/repositories/products-repository";

interface GetAllProductsUseCaseResponse {
  products: Product[];
}

export class GetAllProductsUseCase {
  constructor(private productsRepository: ProductsRepository) { }

  async execute(): Promise<GetAllProductsUseCaseResponse> {
    const products = await this.productsRepository.findAll();

    if (!products) {
      throw new ResourceNotFoundError();
    }

    return {
      products,
    };
  }
}

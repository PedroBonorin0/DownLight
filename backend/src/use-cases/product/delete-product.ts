import { ProductsRepository } from "@/repositories/products-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteProductUseCaseRequest {
  id: string;
}

export class DeleteProductUseCase {
  constructor(private productsRepository: ProductsRepository) { }

  async execute({ id }: DeleteProductUseCaseRequest): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new ResourceNotFoundError();
    }

    await this.productsRepository.delete(id);

    return;
  }
}

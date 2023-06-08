import { Product } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { ProductsRepository } from "@/repositories/products-repository";
import { ProductAlreadyExistsError } from "./errors/product-already-exists-error";

interface EditProductUseCaseRequest {
  name: string;
  price: number;
  id: string;
  amount: number;
}

interface EditProductUseCaseResponse {
  product: Product;
}

export class EditProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    price,
    id,
    amount
  }: EditProductUseCaseRequest): Promise<EditProductUseCaseResponse> {
    const productExists = await this.productsRepository.findById(id);

    if (!productExists) {
      throw new ResourceNotFoundError();
    }

    const productWithSameName =
      await this.productsRepository.findByNameAndIdNotEqual(name, id);

    if (productWithSameName) {
      throw new ProductAlreadyExistsError();
    }

    const product = await this.productsRepository.edit({ name, price, amount, id });

    return {
      product,
    };
  }
}

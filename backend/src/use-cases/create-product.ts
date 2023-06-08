import { ProductsRepository } from "@/repositories/products-repository";
import { Product } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { ProductAlreadyExistsError } from "./errors/product-already-exists-error";

interface CreateProductUseCaseRequest {
  name: string;
  price: number;
  amount?: number;
}

interface CreateProductUseCaseResponse {
  product: Product;
}

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    price,
    amount
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const productWithSameName = await this.productsRepository.findByName(name);

    if (productWithSameName) {
      throw new ProductAlreadyExistsError();
    }
    const product = await this.productsRepository.create({ name, price, amount });

    if (!product) {
      throw new ResourceNotFoundError();
    }

    return {
      product,
    };
  }
}

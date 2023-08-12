import { Product } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { ProductsRepository } from "@/repositories/products-repository";
import { ProductAlreadyExistsError } from "../errors/product-already-exists-error";
import { CategoryRepository } from "@/repositories/category-repository";

interface EditProductUseCaseRequest {
  name: string;
  price: number;
  id: string;
  amount: number;
  categories: string[]
}

interface EditProductUseCaseResponse {
  product: Product;
}

export class EditProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private categoryRepository: CategoryRepository
    ) { }

  async execute({
    name,
    price,
    id,
    amount,
    categories
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

    const categoriesSelected = await this.categoryRepository.findAllByIds(categories)

    if(categoriesSelected.length < categories.length){
      throw new ResourceNotFoundError()
    }

    const oldCategories = await this.productsRepository.findRelatedCategories(id)
  
    const categoriesToRemove = oldCategories.filter(old=> !categories.includes(old))
    const categoriesToAdd = categories.filter(input=>!oldCategories.includes(input))

    const product = await this.productsRepository.edit({ 
      id, 
      name, 
      price, 
      amount, 
      categoriesToAdd, 
      categoriesToRemove 
    });

    return {
      product,
    };
  }
}

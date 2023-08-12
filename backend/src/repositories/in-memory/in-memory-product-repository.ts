import { Prisma, Product } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ProductCreateInput, ProductEditInput, ProductsRepository } from '../products-repository';


interface ProductInterface extends Product {
  categories: string[]
}

export class InMemoryProductRepository implements ProductsRepository {
  public items: ProductInterface[] = []
  
  async findRelatedCategories(id: string){
    const product = this.items.find(item=> item.id === id)

    if(!product){
      return []
    }

    return product.categories
  }
  
  async edit(data: ProductEditInput) {
    const productIndex = this.items.findIndex((item) => item.id === data.id)

    const newCategories = this.items[productIndex].categories
    .filter(category=>!data.categoriesToRemove.includes(category))
    .concat(data.categoriesToAdd)

    if (productIndex >= 0) {
      this.items[productIndex] = {
        ...this.items[productIndex],
        name: data.name,
        price: new Prisma.Decimal(data.price),
        amount: data.amount,
        categories: newCategories
      }
    }

    return this.items[productIndex]
  }
  
  async delete(id: string) {
    this.items = this.items.filter(item=>item.id !== id);
  }

  async findByNameAndIdNotEqual(name: string, id: string){
    
    const product = this.items.find((item)=>
      item.name===name && item.id !== id
    )

    if(!product){
      return null
    }
    return product
  }

  async findById(id: string) {
    const products = this.items.find((item) => item.id === id)

    if (!products) {
      return null
    }
    return products
  }

  async findByName(name: string) {
    const products = this.items.find((item) => item.name === name)

    if (!products) {
      return null
    }
    return products
  }

  async create(data: ProductCreateInput){

    const product = {
      id: randomUUID(),
      name: data.name,
      price: new Prisma.Decimal( data.price.toString()),
      created_at: new Date(),
      amount: data.amount ?? 0,
      categories: data.categories
    }

    this.items.push(product)
    return product
  }

  async findAll() {
    return this.items;
  }
}

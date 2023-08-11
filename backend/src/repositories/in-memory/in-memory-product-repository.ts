import { Prisma, Product } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ProductsRepository } from '../products-repository';

export class InMemoryProductRepository implements ProductsRepository {
  public items: Product[] = []
  
  async edit(data: { name: string; price: number; id: string; amount:number }) {
    const productIndex = this.items.findIndex((item) => item.id === data.id)

    if (productIndex >= 0) {
      this.items[productIndex] = {
        ...this.items[productIndex],
        name: data.name,
        price: new Prisma.Decimal(data.price),
        amount: data.amount
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

  async create(data: Prisma.ProductCreateInput){

    const product = {
      id: randomUUID(),
      name: data.name,
      price: new Prisma.Decimal( data.price.toString()),
      created_at: new Date(),
      amount: data.amount ?? 0
    }

    this.items.push(product)
    return product
  }

  async findAll() {
    return this.items;
  }
}

import { Prisma, Category, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { CategoryRepository } from '../category-repository'


export class InMemoryCategoryRepository implements CategoryRepository {
  public items: Category[] = []

  async edit(data: { name: string; id: string; }) {
    const categoryIndex = this.items.findIndex((item) => item.id === data.id)

    if (categoryIndex >= 0) {
      this.items[categoryIndex] = {
        ...this.items[categoryIndex],
        name: data.name,
      }
    }

    return this.items[categoryIndex]
  }

  async delete(id:string){
    this.items = this.items.filter(item=>item.id !== id);
  }

  async findByNameAndIdNotEqual(name: string, id: string){
    
    const category = this.items.find((item)=>
      item.name===name && item.id !== id
    )

    if(!category){
      return null
    }
    return category
  }

  async findById(id: string) {
    const category = this.items.find((item) => item.id === id)

    if (!category) {
      return null
    }
    return category
  }

  async findByName(name: string) {
    const category = this.items.find((item) => item.name === name)

    if (!category) {
      return null
    }
    return category
  }

  async create(data: Prisma.CategoryCreateInput){

    const category = {
      id: randomUUID(),
      name: data.name,
      created_at: new Date(),
    }

    this.items.push(category)
    return category
  }

  async findAll() {
    return this.items;
  }
}

import { Prisma, Service } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ServicesRepository } from '../services-repository'

export class InMemoryServiceRepository implements ServicesRepository {
  public items: Service[] = []
  
  async edit(data: { name: string; price: number; id: string }) {
    const serviceIndex = this.items.findIndex((item) => item.id === data.id)

    if (serviceIndex >= 0) {
      this.items[serviceIndex] = {
        ...this.items[serviceIndex],
        name: data.name,
        price: new Prisma.Decimal(data.price),
      }
    }

    return this.items[serviceIndex]
  }
  
  async delete(id: string) {
    this.items.filter(item=>item.id !== id);
  }

  async findByNameAndIdNotEqual(name: string, id: string){
    
    const service = this.items.find((item)=>
      item.name===name && item.id !== id
    )

    if(!service){
      return null
    }
    return service
  }

  async findById(id: string) {
    const services = this.items.find((item) => item.id === id)

    if (!services) {
      return null
    }
    return services
  }

  async findByName(name: string) {
    const services = this.items.find((item) => item.name === name)

    if (!services) {
      return null
    }
    return services
  }

  async create(data: Prisma.ServiceCreateInput){

    const service = {
      id: randomUUID(),
      name: data.name,
      price: new Prisma.Decimal( data.price.toString()),
      created_at: new Date()
    }

    this.items.push(service)
    return service
  }

  async findAll() {
    return this.items;
  }
}

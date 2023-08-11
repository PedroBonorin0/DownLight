import { Prisma, Status, StatusPermission, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { StatusRepository } from '../status-repository'

export class InMemoryStatusRepository implements StatusRepository {
  public items: Status[] = []

  async findById(id: string) {
    const status = this.items.find((item) => item.id === id)

    if (!status) {
      return null
    }
    return status
  }

  async findByName(name: string) {
    const status = this.items.find((item) => item.name === name)

    if (!status) {
      return null
    }
    return status
  }

  async create(data: Prisma.StatusCreateInput){

    const status = {
      id: randomUUID(),
      name: data.name,
      color: data.color,
      created_at: new Date(),
      permissions: data.permissions as StatusPermission[],
    }

    this.items.push(status)
    return status
  }

  async findAll() {
    return this.items;
  }
}


import { describe, expect, it,beforeEach } from 'vitest'
import { CreateStatusUseCase } from './create-status'
import { InMemoryStatusRepository } from '@/repositories/in-memory/in-memory-status-repository'
import { StatusAlreadyExistsError } from '../errors/status-already-exists-error'

let statusRepository: InMemoryStatusRepository
let sut: CreateStatusUseCase

describe("Register Use Case",()=>{
  beforeEach(()=>{
    statusRepository = new InMemoryStatusRepository()
    sut = new CreateStatusUseCase(statusRepository)
  })

  it('should not be able to create status with the same name twice', async()=>{
    const name = 'Status Name'

    await sut.execute({
      name,
      color: 'red',
      permissions: ["DELETE","EDIT"]
    })

    await expect(()=>
    sut.execute({
      name,
      color: 'red',
      permissions: ["DELETE","EDIT"]
    })).rejects.toBeInstanceOf(StatusAlreadyExistsError)
  })

  it('should be able to register', async()=>{
    const { status } = await sut.execute({
      name: "Status Name",
      color: 'red',
      permissions: ["DELETE","EDIT"]
    })
    expect(status.id).toEqual(expect.any(String))
  })
})
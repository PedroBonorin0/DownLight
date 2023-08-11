
import { describe, expect, it,beforeEach } from 'vitest'
import { CreateServiceUseCase } from './create-service'
import { InMemoryServiceRepository } from '@/repositories/in-memory/in-memory-service-repository'
import { ServiceAlreadyExistsError } from '../errors/service-already-exists-error'

let serviceRepository: InMemoryServiceRepository
let sut: CreateServiceUseCase

describe("Create Service Use Case",()=>{
  beforeEach(()=>{
    serviceRepository = new InMemoryServiceRepository()
    sut = new CreateServiceUseCase(serviceRepository)
  })

  it('should not be able to create service with same name twice', async()=>{
    const name = 'Service 1'

    await sut.execute({
      name,
      price: 12
    })

    await expect(()=>
      sut.execute({
        name,
        price: 12
    })).rejects.toBeInstanceOf(ServiceAlreadyExistsError)
  })

  it('should be able to create service', async()=>{
    const { service } = await sut.execute({
      name: "Service1",
      price: 14.00
    }) 

    expect(service.id).toEqual(expect.any(String))
  })
})
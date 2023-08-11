
import { describe, expect, it,beforeEach } from 'vitest'
import { GetAllServicesUseCase } from './get-all-services'
import { InMemoryServiceRepository } from '@/repositories/in-memory/in-memory-service-repository'

let serviceRepository: InMemoryServiceRepository
let sut: GetAllServicesUseCase

describe("Get All Services Use Case", ()=>{
  beforeEach(()=>{
    serviceRepository = new InMemoryServiceRepository()
    sut = new GetAllServicesUseCase(serviceRepository)
  })

  it('should be able to get all services', async()=>{
    serviceRepository.create({
      name: 'Service 1',
      price: 14,
    })

    serviceRepository.create({
      name: 'Service 2',
      price: 14,
    })
    
    const { services } = await sut.execute()

    expect(services).toHaveLength(2)
    expect(services).toEqual([
      expect.objectContaining({ name: 'Service 1' }),
      expect.objectContaining({ name: 'Service 2' }),
    ])
  })
})

import { describe, expect, it,beforeEach } from 'vitest'
import { InMemoryServiceRepository } from '@/repositories/in-memory/in-memory-service-repository'
import { DeleteServiceUseCase } from './delete-service'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let serviceRepository: InMemoryServiceRepository
let sut: DeleteServiceUseCase

describe("Delete Service Use Case", ()=>{
  beforeEach(()=>{
    serviceRepository = new InMemoryServiceRepository()
    sut = new DeleteServiceUseCase(serviceRepository)
  })

  it('should be able to delete a specific service', async()=>{
    const servicesBeforeDelete =  serviceRepository.items
    const serviceToDelete = await serviceRepository.create({
      name: 'Service 1',
      price: 14,
    })
    
    serviceRepository.create({
      name: 'Service 2',
      price: 14,
    })
    
    await sut.execute({id: serviceToDelete.id})
    const servicesAfterDelete =  serviceRepository.items

    expect(servicesBeforeDelete).toHaveLength(2)
    expect(servicesAfterDelete).toHaveLength(1)
    expect(servicesAfterDelete).toEqual([
      expect.objectContaining({ name: 'Service 2' }),
    ])
  })

  it('should not be able to delete with wrong id', async()=>{
    await expect(()=>sut.execute({id: 'non-existing-id'}))
      .rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
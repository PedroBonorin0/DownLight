
import { describe, expect, it,beforeEach } from 'vitest'
import { InMemoryServiceRepository } from '@/repositories/in-memory/in-memory-service-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { EditServiceUseCase } from './edit-service'

let serviceRepository: InMemoryServiceRepository
let sut: EditServiceUseCase

describe("Edit Service Use Case", ()=>{
  beforeEach(()=>{
    serviceRepository = new InMemoryServiceRepository()
    sut = new EditServiceUseCase(serviceRepository)
  })

  it('should be able to edit a specific service', async()=>{

    const serviceToEdit = await serviceRepository.create({
      name: 'Service 1',
      price: 14,
    })
    
    serviceRepository.create({
      name: 'Service 2',
      price: 14,
    })
    
    const serviceBeforeEdit = await serviceRepository.findById(serviceToEdit.id)

    await sut.execute({
      id: serviceToEdit.id,
      name: 'Edited Service',
      price: 14,
    })

    const serviceAfterEdit = await serviceRepository.findById(serviceToEdit.id)

    expect(serviceBeforeEdit?.name).toEqual('Service 1')
    expect(serviceAfterEdit?.name).toEqual('Edited Service')
  })

  it('should not be able to edit with wrong id', async()=>{
    await expect(()=>sut.execute(
      {
        id: 'non-existing-id', 
        name: '', 
        price: 1
      }))
      .rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
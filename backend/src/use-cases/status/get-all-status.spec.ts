
import { describe, expect, it,beforeEach } from 'vitest'
import { InMemoryStatusRepository } from '@/repositories/in-memory/in-memory-status-repository'
import { GetAllStatusUseCase } from './get-all-status'

let statusRepository: InMemoryStatusRepository
let sut: GetAllStatusUseCase

describe("Get All Status Use Case", ()=>{
  beforeEach(()=>{
    statusRepository = new InMemoryStatusRepository()
    sut = new GetAllStatusUseCase(statusRepository)
  })

  it('should be able to get all status', async()=>{
    statusRepository.create({
      name: 'Status 1',
      color: 'red',
    })

    statusRepository.create({
      name: 'Status 2',
      color: 'red',
    })
    
    const { status } = await sut.execute()

    expect(status).toHaveLength(2)
    expect(status).toEqual([
      expect.objectContaining({ name: 'Status 1' }),
      expect.objectContaining({ name: 'Status 2' }),
    ])
  })

  
})
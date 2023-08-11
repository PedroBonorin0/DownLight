
import { InMemoryCategoryRepository } from '@/repositories/in-memory/in-memory-category-repository'
import { describe, expect, it,beforeEach } from 'vitest'
import { GetAllCategoryUseCase } from './get-all-categories'

let categoryRepository: InMemoryCategoryRepository
let sut: GetAllCategoryUseCase

describe("Get All Categories Use Case", ()=>{
  beforeEach(()=>{
    categoryRepository = new InMemoryCategoryRepository()
    sut = new GetAllCategoryUseCase(categoryRepository)
  })

  it('should be able to get all categories', async()=>{
    categoryRepository.create({
      name: 'Category 1',
    })

    categoryRepository.create({
      name: 'Category 2',
    })
    
    const { categories } = await sut.execute()

    expect(categories).toHaveLength(2)
    expect(categories).toEqual([
      expect.objectContaining({ name: 'Category 1' }),
      expect.objectContaining({ name: 'Category 2' }),
    ])
  })

  
})
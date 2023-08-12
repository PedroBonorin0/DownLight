
import { describe, expect, it,beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { DeleteCategoryUseCase } from './delete-category'
import { InMemoryCategoryRepository } from '@/repositories/in-memory/in-memory-category-repository'


let categoryRepository: InMemoryCategoryRepository
let sut: DeleteCategoryUseCase

describe("Delete Category Use Case", ()=>{
  beforeEach(()=>{
    categoryRepository = new InMemoryCategoryRepository()
    sut = new DeleteCategoryUseCase(categoryRepository)
  })

  it('should be able to delete a specific category', async()=>{
    const categoriesBeforeDelete =  categoryRepository.items
    const categoryToDelete = await categoryRepository.create({
      name: 'Category 1',
    })
    
    categoryRepository.create({
      name: 'Category 2',
    })
    
    await sut.execute({id: categoryToDelete.id})
    const categoriesAfterDelete =  categoryRepository.items

    expect(categoriesBeforeDelete).toHaveLength(2)
    expect(categoriesAfterDelete).toHaveLength(1)
    expect(categoriesAfterDelete).toEqual([
      expect.objectContaining({ name: 'Category 2' }),
    ])
  })

  it('should not be able to delete with wrong id', async()=>{
    await expect(()=>sut.execute({id: 'non-existing-id'}))
      .rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
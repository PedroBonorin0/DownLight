
import { describe, expect, it,beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryCategoryRepository } from '@/repositories/in-memory/in-memory-category-repository'
import { EditCategoryUseCase } from './edit-category'
import { CategoryAlreadyExistsError } from '../errors/category-already-exists'


let categoryRepository: InMemoryCategoryRepository
let sut: EditCategoryUseCase

describe("Edit Category Use Case", ()=>{
  beforeEach(()=>{
    categoryRepository = new InMemoryCategoryRepository()
    sut = new EditCategoryUseCase(categoryRepository)
  })

  it('should be able to edit a specific category', async()=>{

    const categoryToEdit = await categoryRepository.create({
      name: 'Category 1',
    })
    
    categoryRepository.create({
      name: 'Category 2',
    })
    
    const categoryBeforeEdit = await categoryRepository.findById(categoryToEdit.id)

    await sut.execute({
      id: categoryToEdit.id,
      name: 'Edited Category',
    })

    const categoryAfterEdit = await categoryRepository.findById(categoryToEdit.id)

    expect(categoryBeforeEdit?.name).toEqual('Category 1')
    expect(categoryAfterEdit?.name).toEqual('Edited Category')
  })

  it('should not be able to edit with wrong id', async()=>{
    await expect(()=>sut.execute(
      {
        id: 'non-existing-id', 
        name: '', 
      }))
    .rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to edit to an existing name', async()=>{
    const name = 'Category 2'
    
    const categoryToEdit = await categoryRepository.create({
      name: 'Category 1',
    })
    
    categoryRepository.create({
      name,
    })
    
    await expect(()=>sut.execute(
      {
        id: categoryToEdit.id, 
        name, 
      }))
      .rejects.toBeInstanceOf(CategoryAlreadyExistsError)
  })
})
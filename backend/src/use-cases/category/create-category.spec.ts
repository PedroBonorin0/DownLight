
import { describe, expect, it,beforeEach } from 'vitest'
import { CreateCategoryUseCase } from './create-category'
import { InMemoryCategoryRepository } from '@/repositories/in-memory/in-memory-category-repository'
import { CategoryAlreadyExistsError } from '../errors/category-already-exists'


let statusRepository: InMemoryCategoryRepository
let sut: CreateCategoryUseCase

describe("Create Category Use Case",()=>{
  beforeEach(()=>{
    statusRepository = new InMemoryCategoryRepository()
    sut = new CreateCategoryUseCase(statusRepository)
  })

  it('should not be able to create category with the same name twice', async()=>{
    const name = 'Category Name'

    await sut.execute({
      name,
    })

    await expect(()=>
    sut.execute({
      name,
    })).rejects.toBeInstanceOf(CategoryAlreadyExistsError)
  })

  it('should be able to create category', async()=>{
    const { category } = await sut.execute({
      name: "Category Name",
    })
    expect(category.id).toEqual(expect.any(String))
  })
})
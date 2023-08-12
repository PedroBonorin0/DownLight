
import { describe, expect, it,beforeEach } from 'vitest'
import { CreateProductUseCase } from './create-product'
import { InMemoryProductRepository } from '@/repositories/in-memory/in-memory-product-repository'
import { ProductAlreadyExistsError } from '../errors/product-already-exists-error'
import { InMemoryCategoryRepository } from '@/repositories/in-memory/in-memory-category-repository'

let productRepository: InMemoryProductRepository
let categoryRepository: InMemoryCategoryRepository
let sut: CreateProductUseCase

describe("Create Product Use Case",()=>{
  beforeEach(()=>{
    productRepository = new InMemoryProductRepository()
    categoryRepository = new InMemoryCategoryRepository()
    sut = new CreateProductUseCase(productRepository, categoryRepository)
  })

  it('should not be able to create product with same name twice', async()=>{
    const name = 'Product 1'

    await sut.execute({
      name,
      price: 12,
      amount: 1,
      categories:[]
    })

    await expect(()=>
      sut.execute({
        name,
        price: 12,
        amount: 1,
        categories:[]
    })).rejects.toBeInstanceOf(ProductAlreadyExistsError)
  })

  it('should be able to create product', async()=>{
    const { product } = await sut.execute({
      name: 'Product 1',
      price: 12,
      amount: 1,
      categories:[]
    }) 

    expect(product.id).toEqual(expect.any(String))
  })
})
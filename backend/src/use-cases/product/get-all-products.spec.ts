
import { describe, expect, it,beforeEach } from 'vitest'
import { GetAllProductsUseCase } from './get-all-products'
import { InMemoryProductRepository } from '@/repositories/in-memory/in-memory-product-repository'

let productRepository: InMemoryProductRepository
let sut: GetAllProductsUseCase

describe("Get All Products Use Case", ()=>{
  beforeEach(()=>{
    productRepository = new InMemoryProductRepository()
    sut = new GetAllProductsUseCase(productRepository)
  })

  it('should be able to get all products', async()=>{
    productRepository.create({
      name: 'Product 1',
      price: 14,
    })

    productRepository.create({
      name: 'Product 2',
      price: 14,
    })
    
    const { products } = await sut.execute()

    expect(products).toHaveLength(2)
    expect(products).toEqual([
      expect.objectContaining({ name: 'Product 1' }),
      expect.objectContaining({ name: 'Product 2' }),
    ])
  })
})
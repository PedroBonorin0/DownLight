
import { describe, expect, it,beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { DeleteProductUseCase } from './delete-product'
import { InMemoryProductRepository } from '@/repositories/in-memory/in-memory-product-repository'

let productRepository: InMemoryProductRepository
let sut: DeleteProductUseCase

describe("Delete Product Use Case", ()=>{
  beforeEach(()=>{
    productRepository = new InMemoryProductRepository()
    sut = new DeleteProductUseCase(productRepository)
  })

  it('should be able to delete a specific product', async()=>{
    const productsBeforeDelete =  productRepository.items
    const productToDelete = await productRepository.create({
      name: 'Product 1',
      price: 14,
    })
    
    productRepository.create({
      name: 'Product 2',
      price: 14,
    })
    
    await sut.execute({id: productToDelete.id})
    const productsAfterDelete =  productRepository.items

    expect(productsBeforeDelete).toHaveLength(2)
    expect(productsAfterDelete).toHaveLength(1)
    expect(productsAfterDelete).toEqual([
      expect.objectContaining({ name: 'Product 2' }),
    ])
  })

  it('should not be able to delete with wrong id', async()=>{
    await expect(()=>sut.execute({id: 'non-existing-id'}))
      .rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

import { describe, expect, it,beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { EditProductUseCase } from './edit-product'
import { InMemoryProductRepository } from '@/repositories/in-memory/in-memory-product-repository'
import { ProductAlreadyExistsError } from '../errors/product-already-exists-error'

let productRepository: InMemoryProductRepository
let sut: EditProductUseCase

describe("Edit Product Use Case", ()=>{
  beforeEach(()=>{
    productRepository = new InMemoryProductRepository()
    sut = new EditProductUseCase(productRepository)
  })

  it('should be able to edit a specific product', async()=>{

    const productToEdit = await productRepository.create({
      name: 'Product 1',
      price: 14,
    })
    
    productRepository.create({
      name: 'Product 2',
      price: 14,
    })
    
    const productBeforeEdit = await productRepository.findById(productToEdit.id)

    await sut.execute({
      id: productToEdit.id,
      name: 'Edited Product',
      price: 14,
      amount: 1
    })

    const productAfterEdit = await productRepository.findById(productToEdit.id)

    expect(productBeforeEdit?.name).toEqual('Product 1')
    expect(productAfterEdit?.name).toEqual('Edited Product')
  })

  it('should not be able to edit with wrong id', async()=>{
    await expect(()=>sut.execute(
      {
        id: 'non-existing-id', 
        name: '', 
        price: 1,
        amount: 1
      }))
    .rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to edit to an existing name', async()=>{
    const name = 'Product 2'
    
    const productToEdit = await productRepository.create({
      name: 'Product 1',
      price: 14,
    })
    
    productRepository.create({
      name,
      price: 14,
    })
    
    await expect(()=>sut.execute(
      {
        id: productToEdit.id, 
        name, 
        price: 1,
        amount: 0
      }))
      .rejects.toBeInstanceOf(ProductAlreadyExistsError)
  })
})
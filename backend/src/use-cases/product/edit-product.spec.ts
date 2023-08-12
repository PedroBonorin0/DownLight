
import { describe, expect, it,beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { EditProductUseCase } from './edit-product'
import { InMemoryProductRepository } from '@/repositories/in-memory/in-memory-product-repository'
import { ProductAlreadyExistsError } from '../errors/product-already-exists-error'
import { InMemoryCategoryRepository } from '@/repositories/in-memory/in-memory-category-repository'

let productRepository: InMemoryProductRepository
let categoryRepository: InMemoryCategoryRepository
let sut: EditProductUseCase

describe("Edit Product Use Case", ()=>{
  beforeEach(()=>{
    productRepository = new InMemoryProductRepository()
    categoryRepository = new InMemoryCategoryRepository()
    sut = new EditProductUseCase(productRepository,categoryRepository)
  })

  it('should be able to edit a specific product', async()=>{

    const productToEdit = await productRepository.create({
      name: 'Product 1',
      price: 14,
      amount: 0,
      categories: []
    })
    
    productRepository.create({
      name: 'Product 2',
      price: 14,
      amount: 0,
      categories: []
    })
    
    const productBeforeEdit = await productRepository.findById(productToEdit.id)

    await sut.execute({
      id: productToEdit.id,
      name: 'Edited Product',
      price: 14,
      amount: 1,
      categories: []
    })

    const productAfterEdit = await productRepository.findById(productToEdit.id)

    expect(productBeforeEdit?.name).toEqual('Product 1')
    expect(productAfterEdit?.name).toEqual('Edited Product')
  })

  it('should be able to edit categories of specific product', async()=>{

    const category = await categoryRepository.create({
      name: 'Category 1',
    })

    const category2 = await categoryRepository.create({
      name: 'Category 2',
    })

    const productToEdit = await productRepository.create({
      name: 'Product 1',
      price: 14,
      amount: 0,
      categories: [category.id]
    })
        
    const productBeforeEdit = await productRepository.findById(productToEdit.id)

    await sut.execute({
      id: productToEdit.id,
      name: 'Edited Product',
      price: 14,
      amount: 1,
      categories: [category2.id]
    })

    const productAfterEdit = await productRepository.findById(productToEdit.id)

    expect(productBeforeEdit?.categories).toHaveLength(1)
    expect(productAfterEdit?.categories).toHaveLength(1)
    expect(productBeforeEdit?.categories).toEqual([category.id])
    expect(productAfterEdit?.categories).toEqual([category2.id])
  })

  it('should not be able to edit with wrong id', async()=>{
    await expect(()=>sut.execute(
      {
        id: 'non-existing-id', 
        name: '', 
        price: 1,
        amount: 1,
        categories: []
      }))
    .rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to edit to an existing name', async()=>{
    const name = 'Product 2'
    
    const productToEdit = await productRepository.create({
      name: 'Product 1',
      price: 14,
      amount: 0,
      categories: []
    })
    
    productRepository.create({
      name,
      price: 14,
      amount: 0,
      categories: []
    })
    
    await expect(()=>sut.execute(
      {
        id: productToEdit.id, 
        name, 
        price: 1,
        amount: 0,
        categories: []
      }))
      .rejects.toBeInstanceOf(ProductAlreadyExistsError)
  })
})
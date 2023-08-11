import { InMemoryUsersRepository } from './../../repositories/in-memory/in-memory-users-repository'
import { describe, expect, it,beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe("Register Use Case",()=>{
  beforeEach(()=>{
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async ()=> {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: '123456',
      avatar_url: '',
      role:  'MEMBER'
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async()=>{
    const email = 'johndoe@example.com'

    await sut.execute({
      name: "John Doe",
      email,
      password: '123456',
      avatar_url: '',
      role:  'MEMBER'
    })

    await expect(()=>
    sut.execute({
      name: "John Doe",
      email,
      password: '123456',
      avatar_url: '',
      role:  'MEMBER'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async()=>{
    const { user } = await sut.execute({
      name: "John Doe",
      email: 'johndoe@example.com',
      password: '123456',
      avatar_url: '',
      role:  'MEMBER'
    }) 

    expect(user.id).toEqual(expect.any(String))
  })
})
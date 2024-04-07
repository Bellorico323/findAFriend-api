import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { RegisterOrgUseCase } from './register-org'
import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to hash password upon registration', async () => {
    const { org } = await sut.execute({
      title: 'ORG-01',
      email: 'org01@example.com',
      manager: 'John Doe',
      address: 'street 1',
      cep: '11111111',
      phone: '99 9999-9999',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@xample.com'

    await sut.execute({
      title: 'ORG-01',
      email,
      manager: 'John Doe',
      address: 'street 1',
      cep: '11111111',
      phone: '99 9999-9999',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        title: 'ORG-01',
        email,
        manager: 'John Doe',
        address: 'street 1',
        cep: '11111111',
        phone: '99 9999-9999',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should  be able to register', async () => {
    const { org } = await sut.execute({
      title: 'ORG-01',
      email: 'org01@example.com',
      manager: 'John Doe',
      address: 'street 1',
      cep: '11111111',
      phone: '99 9999-9999',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})

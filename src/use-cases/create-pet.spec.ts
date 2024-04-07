import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Rex',
      age: 'Filhote',
      city: 'São Paulo',
      energy: 'high',
      description: 'description...',
      environment: 'wide environment',
      independency: 'low independency',
      size: 'small',
      org_id: '1',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})

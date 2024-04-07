import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsInACityUseCase } from './fetch-pets-in-a-city'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsInACityUseCase

describe('Fetch Pets In A City Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsInACityUseCase(petsRepository)
  })

  it('should be able to fetch for pets in a city', async () => {
    await petsRepository.create({
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

    await petsRepository.create({
      name: 'Ricardinho',
      age: 'Filhote',
      city: 'São Paulo',
      energy: 'high',
      description: 'description...',
      environment: 'wide environment',
      independency: 'low independency',
      size: 'small',
      org_id: '1',
    })

    const { pets } = await sut.execute({ city: 'São Paulo', query: {} })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Rex' }),
      expect.objectContaining({ name: 'Ricardinho' }),
    ])
  })

  it('should be able to filter a pet by age', async () => {
    await petsRepository.create({
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

    await petsRepository.create({
      name: 'Ricardinho',
      age: 'Adulto',
      city: 'São Paulo',
      energy: 'high',
      description: 'description...',
      environment: 'wide environment',
      independency: 'low independency',
      size: 'small',
      org_id: '1',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      query: { age: 'Filhote' },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Rex' })])
  })

  it('should be able to filter a pet by size', async () => {
    await petsRepository.create({
      name: 'Rex',
      age: 'Filhote',
      city: 'São Paulo',
      energy: 'high',
      description: 'description...',
      environment: 'wide environment',
      independency: 'low independency',
      size: 'big',
      org_id: '1',
    })

    await petsRepository.create({
      name: 'Ricardinho',
      age: 'Adulto',
      city: 'São Paulo',
      energy: 'high',
      description: 'description...',
      environment: 'wide environment',
      independency: 'low independency',
      size: 'small',
      org_id: '1',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      query: { size: 'big' },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Rex' })])
  })

  it('should be able to filter a pet by energy', async () => {
    await petsRepository.create({
      name: 'Rex',
      age: 'Filhote',
      city: 'São Paulo',
      energy: 'high',
      description: 'description...',
      environment: 'wide environment',
      independency: 'low independency',
      size: 'big',
      org_id: '1',
    })

    await petsRepository.create({
      name: 'Ricardinho',
      age: 'Adulto',
      city: 'São Paulo',
      energy: 'low',
      description: 'description...',
      environment: 'wide environment',
      independency: 'low independency',
      size: 'small',
      org_id: '1',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      query: { energy: 'low' },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Ricardinho' })])
  })

  it('should be able to filter a pet by all filters', async () => {
    await petsRepository.create({
      name: 'Rex',
      age: 'Filhote',
      city: 'São Paulo',
      energy: 'high',
      description: 'description...',
      environment: 'wide environment',
      independency: 'low independency',
      size: 'big',
      org_id: '1',
    })

    await petsRepository.create({
      name: 'Ricardinho',
      age: 'Adulto',
      city: 'São Paulo',
      energy: 'low',
      description: 'description...',
      environment: 'wide environment',
      independency: 'low independency',
      size: 'small',
      org_id: '1',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      query: {
        energy: 'low',
        age: 'Adulto',
        size: 'small',
        independency: 'low independency',
      },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Ricardinho' })])
  })
})

import { Prisma, Pet } from '@prisma/client'
import { FilterPetsQuery, PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) return null

    return pet
  }

  async findManyByCity(city: string, query: FilterPetsQuery) {
    let petsInCity = this.pets.filter((pet) => pet.city === city)

    if (Object.keys(query).length > 0) {
      petsInCity = petsInCity.filter((pet) => {
        if (query.age !== undefined && pet.age !== query.age) return false
        if (query.energy !== undefined && pet.energy !== query.energy)
          return false
        if (
          query.independency !== undefined &&
          pet.independency !== query.independency
        )
          return false
        if (query.size !== undefined && pet.size !== query.size) return false

        return true
      })
    }

    return petsInCity
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independency: data.independency,
      environment: data.environment,
      city: data.city,
      created_at: new Date(),
      org_id: data.org_id,
    }

    this.pets.push(pet)

    return pet
  }
}

import { Prisma } from '@prisma/client'
import { FilterPetsQuery, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findManyByCity(city: string, query?: FilterPetsQuery | undefined) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
        age: {
          equals: query?.age,
        },
        independency: {
          equals: query?.independency,
        },
        energy: {
          equals: query?.energy,
        },
        size: {
          equals: query?.size,
        },
      },
    })
    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })
    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })
    return pet
  }
}

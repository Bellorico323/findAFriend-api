import { Pet, Prisma } from '@prisma/client'

export interface FilterPetsQuery {
  age?: 'Filhote' | 'Adulto'
  energy?: string
  size?: string
  independency?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyByCity(city: string, query?: FilterPetsQuery): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}

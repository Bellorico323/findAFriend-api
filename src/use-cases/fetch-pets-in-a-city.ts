import { FilterPetsQuery, PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsInACityUseCaseRequest {
  query: FilterPetsQuery
  city: string
}

interface FetchPetsInACityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsInACityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
    city,
  }: FetchPetsInACityUseCaseRequest): Promise<FetchPetsInACityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(city, query)

    return { pets }
  }
}

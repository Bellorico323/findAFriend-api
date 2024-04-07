import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsInACityUseCase } from '../fetch-pets-in-a-city'

export function makeFetchPetsInACityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetsInACityUseCase = new FetchPetsInACityUseCase(petsRepository)

  return fetchPetsInACityUseCase
}

import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: 'Filhote' | 'Adulto'
  size: string
  energy: string
  independency: string
  environment: string
  city: string
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    age,
    city,
    description,
    energy,
    environment,
    independency,
    org_id,
    size,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      age,
      city,
      description,
      energy,
      environment,
      independency,
      org_id,
      size,
    })

    return { pet }
  }
}

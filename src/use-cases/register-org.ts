import { OrgsRepository } from '@/repositories/orgs-repository'
import { ORG } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface RegisterOrgUseCaseRequest {
  title: string
  manager: string
  email: string
  address: string
  phone: string
  cep: string
  password: string
}

interface RegisterOrgUseCaseResponse {
  org: ORG
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    title,
    email,
    manager,
    cep,
    password,
    address,
    phone,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      title,
      email,
      manager,
      address,
      cep,
      password_hash,
      phone,
    })

    return { org }
  }
}

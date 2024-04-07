import { ORG, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgRepository implements OrgsRepository {
  public orgs: ORG[] = []

  async findByEmail(email: string) {
    const org = this.orgs.find((org) => org.email === email)

    if (!org) return null

    return org
  }

  async create(data: Prisma.ORGCreateInput) {
    const org: ORG = {
      id: randomUUID(),
      title: data.title,
      manager: data.manager,
      email: data.email,
      phone: data.phone,
      cep: data.cep,
      address: data.address,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.orgs.push(org)

    return org
  }
}

import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details', async () => {
    const org = await prisma.oRG.create({
      data: {
        title: 'ORG-01',
        email: 'org01@example.com',
        manager: 'John Doe',
        address: 'street 1',
        cep: '11111111',
        phone: '99 9999-9999',
        password_hash: await hash('123456', 6),
      },
    })

    const pet = await prisma.pet.create({
      data: {
        name: 'Rex',
        age: 'Filhote',
        city: 'São Paulo',
        energy: 'high',
        description: 'description...',
        environment: 'wide environment',
        independency: 'low independency',
        size: 'small',
        org_id: org.id,
      },
    })

    const response = await request(app.server).get(`/details/${pet.id}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(expect.objectContaining({ name: 'Rex' }))
  })
})

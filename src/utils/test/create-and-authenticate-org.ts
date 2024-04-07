import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
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

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'org01@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token, org }
}

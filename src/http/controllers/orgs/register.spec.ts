import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      title: 'ORG-01',
      email: 'org01@example.com',
      manager: 'John Doe',
      address: 'street 1',
      cep: '11111111',
      phone: '99 9999-9999',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})

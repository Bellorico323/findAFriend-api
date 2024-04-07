import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Rex',
        age: 'Filhote',
        city: 'São Paulo',
        energy: 'high',
        description: 'description...',
        environment: 'wide environment',
        independency: 'low independency',
        size: 'small',
        org_id: org.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})

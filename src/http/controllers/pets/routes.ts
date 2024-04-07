import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middleware/verify-jwt'
import { fetch } from './fetch'
import { details } from './details'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, create)
  app.get('/pets/:city', fetch)
  app.get('/details/:id', details)
}

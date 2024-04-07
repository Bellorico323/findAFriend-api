import { FastifyInstance } from 'fastify'
import { register } from './register'
import { autheticate } from './authenticate'
import { refresh } from './refresh'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', autheticate)
  app.patch('/token/refresh', refresh)
}

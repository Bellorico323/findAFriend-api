import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    age: z.enum(['Filhote', 'Adulto']),
    city: z.string(),
    energy: z.string(),
    description: z.string(),
    environment: z.string(),
    independency: z.string(),
    size: z.string(),
    org_id: z.string(),
  })

  const {
    name,
    age,
    city,
    description,
    energy,
    environment,
    independency,
    org_id,
    size,
  } = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
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

  return reply.status(201).send()
}

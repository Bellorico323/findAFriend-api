import { makeFetchPetsInACityUseCase } from '@/use-cases/factories/make-fetch-pets-in-a-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetQuerySchema = z.object({
    age: z.enum(['Filhote', 'Adulto']).optional(),
    energy: z.string().optional(),
    size: z.string().optional(),
    independency: z.string().optional(),
  })

  const fetchPetParamsSchema = z.object({
    city: z.string(),
  })

  const { size, age, energy, independency } = fetchPetQuerySchema.parse(
    request.query,
  )

  const { city } = fetchPetParamsSchema.parse(request.params)

  const fetchPetsUseCase = makeFetchPetsInACityUseCase()

  const pets = await fetchPetsUseCase.execute({
    city,
    query: {
      age,
      energy,
      independency,
      size,
    },
  })

  return reply.status(200).send(pets)
}

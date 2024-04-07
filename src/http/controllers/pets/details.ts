import { makeGetPetsDetailsUseCase } from '@/use-cases/factories/make-get-pets-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const getPetDetailsParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getPetDetailsParamsSchema.parse(request.params)

  const getPetDetailsUseCase = makeGetPetsDetailsUseCase()

  const pet = await getPetDetailsUseCase.execute({
    petId: id,
  })

  return reply.status(200).send(pet)
}

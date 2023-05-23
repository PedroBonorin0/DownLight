import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services-repository';
import { CreateServiceUseCase } from '@/use-cases/create-service';
import { GetAllServicesUseCase } from '@/use-cases/get-all-services';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function listAll(_request: FastifyRequest, reply: FastifyReply) {
  const servicesRepository = new PrismaServicesRepository();
  const getAllServicesUseCase = new GetAllServicesUseCase(servicesRepository);

  const { services } = await getAllServicesUseCase.execute()

  return reply.status(200).send(services);
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createServiceBodySchema = z.object({
    name: z.string(),
    price: z.number()
  });

  const { name, price } = createServiceBodySchema.parse(
    request.body
  );

  try {
    const servicesRepository = new PrismaServicesRepository();
    const createServiceUseCase = new CreateServiceUseCase(servicesRepository);

    await createServiceUseCase.execute({
      name,
      price
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) { // fix me lol
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}

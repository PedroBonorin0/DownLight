import { PrismaServicesRepository } from "@/repositories/prisma/prisma-services-repository";
import { CreateServiceUseCase } from "@/use-cases/service/create-service";
import { GetAllServicesUseCase } from "@/use-cases/service/get-all-services";
import { EditServiceUseCase } from "@/use-cases/service/edit-service";
import { DeleteServiceUseCase } from "@/use-cases/service/delete-service";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ServiceAlreadyExistsError } from "@/use-cases/errors/service-already-exists-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

export async function listAllServices(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const servicesRepository = new PrismaServicesRepository();
  const getAllServicesUseCase = new GetAllServicesUseCase(servicesRepository);

  const { services } = await getAllServicesUseCase.execute();

  return reply.status(200).send(services);
}

export async function createService(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createServiceBodySchema = z.object({
    name: z.string(),
    price: z.number(),
  });

  const { name, price } = createServiceBodySchema.parse(request.body);

  try {
    const servicesRepository = new PrismaServicesRepository();
    const createServiceUseCase = new CreateServiceUseCase(servicesRepository);

    await createServiceUseCase.execute({
      name,
      price,
    });
  } catch (err) {
    if (err instanceof ServiceAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}

export async function editService(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const editServiceBodySchema = z.object({
    name: z.string(),
    price: z.number(),
  });

  const editServiceParamsSchema = z.object({
    id: z.string(),
  });

  const { name, price } = editServiceBodySchema.parse(request.body);

  const { id } = editServiceParamsSchema.parse(request.params);

  try {
    const servicesRepository = new PrismaServicesRepository();
    const editServiceUseCase = new EditServiceUseCase(servicesRepository);

    await editServiceUseCase.execute({
      name,
      price,
      id,
    });
  } catch (err) {
    if (err instanceof ServiceAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}

export async function deleteService(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteServiceParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteServiceParamsSchema.parse(request.params);

  try {
    const servicesRepository = new PrismaServicesRepository();
    const deleteServiceUseCase = new DeleteServiceUseCase(servicesRepository);

    await deleteServiceUseCase.execute({
      id,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}

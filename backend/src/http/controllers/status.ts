import { PrismaStatusRepository } from "@/repositories/prisma/prisma-status-repository";
import { StatusAlreadyExistsError } from "@/use-cases/errors/status-already-exists-error";
import { CreateStatusUseCase } from "@/use-cases/status/create-status";
import { GetAllStatusUseCase } from "@/use-cases/status/get-all-status";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createStatus(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createStatusBodySchema = z.object({
    name: z.string(),
    color: z.string(),
    permissions: z.array(z.enum(["DELETE", "EDIT"])).default(["DELETE", "EDIT"])
  });

  const { name, color, permissions } = createStatusBodySchema.parse(request.body);

  try {
    const StatusRepository = new PrismaStatusRepository();
    const createStatusUseCase = new CreateStatusUseCase(StatusRepository);

    await createStatusUseCase.execute({
      name,
      color,
      permissions
    });
  } catch (err) {
    if (err instanceof StatusAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}

export async function listAllStatus(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const statusRepository = new PrismaStatusRepository();
  const getAllStatusUseCase = new GetAllStatusUseCase(statusRepository);

  const { status } = await getAllStatusUseCase.execute();

  return reply.status(200).send(status);
}


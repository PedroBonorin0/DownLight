import { StatusRepository } from "@/repositories/status-repository";
import { Status, StatusPermission } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { StatusAlreadyExistsError } from "../errors/status-already-exists-error";


interface GetStatusUseCaseRequest {
  name: string;
  color: string;
  permissions: StatusPermission[]
}

interface CreateStatusUseCaseResponse {
  status: Status;
}

export class CreateStatusUseCase {
  constructor(private statusRepository: StatusRepository) { }

  async execute({
    name,
    color,
    permissions
  }: GetStatusUseCaseRequest): Promise<CreateStatusUseCaseResponse> {
    await new Promise((r) => setTimeout(r, 2000));

    const statusWithSameName = await this.statusRepository.findByName(name);

    if (statusWithSameName) {
      throw new StatusAlreadyExistsError();
    }
    const status = await this.statusRepository.create({ name, color, permissions });

    if (!status) {
      throw new ResourceNotFoundError();
    }

    return {
      status,
    };
  }
}

import { StatusRepository } from "@/repositories/status-repository";
import { Status } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

interface GetAllStatusUseCaseResponse {
  status: Status[];
}

export class GetAllStatusUseCase {
  constructor(private statusRepository: StatusRepository) { }

  async execute(): Promise<GetAllStatusUseCaseResponse> {

    const status = await this.statusRepository.findAll();

    if (!status) {
      throw new ResourceNotFoundError();
    }

    return {
      status,
    };
  }
}

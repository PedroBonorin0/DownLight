import { StatusRepository } from "@/repositories/status-repository";
import { Status } from "@prisma/client";

interface GetAllStatusUseCaseResponse {
  status: Status[];
}

export class GetAllStatusUseCase {
  constructor(private statusRepository: StatusRepository) { }

  async execute(): Promise<GetAllStatusUseCaseResponse> {

    const status = await this.statusRepository.findAll();

    return {
      status,
    };
  }
}

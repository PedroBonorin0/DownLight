import { ServicesRepository } from "@/repositories/services-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteServiceUseCaseRequest {
  id: string;
}

export class DeleteServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) { }

  async execute({ id }: DeleteServiceUseCaseRequest): Promise<void> {

    const service = await this.servicesRepository.findById(id);

    if (!service) {
      throw new ResourceNotFoundError();
    }

    await this.servicesRepository.delete(id);

    return;
  }
}

import { ServicesRepository } from "@/repositories/services-repository";
import { Service } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { ServiceAlreadyExistsError } from "./errors/service-already-exists-error";

interface EditServiceUseCaseRequest {
  name: string;
  price: number;
  id: string;
}

interface EditServiceUseCaseResponse {
  service: Service;
}

export class EditServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute({
    name,
    price,
    id,
  }: EditServiceUseCaseRequest): Promise<EditServiceUseCaseResponse> {
    const serviceExists = await this.servicesRepository.findById(id);

    if (!serviceExists) {
      throw new ResourceNotFoundError();
    }

    const serviceWithSameName =
      await this.servicesRepository.findByNameAndIdNotEqual(name, id);

    if (serviceWithSameName) {
      throw new ServiceAlreadyExistsError();
    }

    const service = await this.servicesRepository.edit({ name, price, id });

    return {
      service,
    };
  }
}

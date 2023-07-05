import { ServicesRepository } from "@/repositories/services-repository";
import { Service } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { ServiceAlreadyExistsError } from "../errors/service-already-exists-error";

interface GetUserProfileUseCaseRequest {
  name: string;
  price: number;
}

interface CreateServiceUseCaseResponse {
  service: Service;
}

export class CreateServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) { }

  async execute({
    name,
    price,
  }: GetUserProfileUseCaseRequest): Promise<CreateServiceUseCaseResponse> {
    await new Promise((r) => setTimeout(r, 2000));
    const serviceWithSameName = await this.servicesRepository.findByName(name);

    if (serviceWithSameName) {
      throw new ServiceAlreadyExistsError();
    }
    const service = await this.servicesRepository.create({ name, price });

    if (!service) {
      throw new ResourceNotFoundError();
    }

    return {
      service,
    };
  }
}

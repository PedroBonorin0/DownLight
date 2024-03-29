import { ServicesRepository } from "@/repositories/services-repository";
import { Service } from "@prisma/client";
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
    const serviceWithSameName = await this.servicesRepository.findByName(name);

    if (serviceWithSameName) {
      throw new ServiceAlreadyExistsError();
    }
    const service = await this.servicesRepository.create({ name, price });

    return {
      service,
    };
  }
}

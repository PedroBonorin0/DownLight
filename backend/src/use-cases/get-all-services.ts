import { ServicesRepository } from '@/repositories/services-repository';
import { Service } from '@prisma/client';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface GetAllServicesUseCaseResponse {
  services: Service[]
}

export class GetAllServicesUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute(): Promise<GetAllServicesUseCaseResponse> {
    const services = await this.servicesRepository.findAll();

    if (!services) {
      throw new ResourceNotFoundError();
    }

    return {
      services,
    };
  }
}

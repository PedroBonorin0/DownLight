import { ServicesRepository } from '@/repositories/services-repository';
import { Service } from '@prisma/client';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface GetUserProfileUseCaseRequest {
  name: string;
  price: number;
}

interface CreateServiceUseCaseResponse {
  service: Service
}

export class CreateServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute({
    name, price
  }: GetUserProfileUseCaseRequest): Promise<CreateServiceUseCaseResponse> {
    const service = await this.servicesRepository.create(
      { name, price }
    );

    if (!service) {
      throw new ResourceNotFoundError();
    }

    return {
      service,
    };
  }
}

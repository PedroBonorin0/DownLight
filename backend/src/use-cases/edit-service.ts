import { ServicesRepository } from '@/repositories/services-repository';
import { Service } from '@prisma/client';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

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
    name, price, id
  }: EditServiceUseCaseRequest): Promise<EditServiceUseCaseResponse> {
    const service = await this.servicesRepository.edit(
      { name, price, id }
    );

    if (!service) {
      throw new ResourceNotFoundError();
    }

    return {
      service,
    };
  }
}

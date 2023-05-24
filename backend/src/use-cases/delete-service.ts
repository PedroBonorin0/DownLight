import { ServicesRepository } from '@/repositories/services-repository';

interface DeleteServiceUseCaseRequest {
  id: string;
}

export class DeleteServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute({
    id
  }: DeleteServiceUseCaseRequest): Promise<void> {
    await this.servicesRepository.delete(id);

    return;
  }
}

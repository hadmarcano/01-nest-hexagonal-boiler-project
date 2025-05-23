import { UserRepository } from '../domain/repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { UserInfraestructure } from '../infraestructure/user.infraestructure';
import { UserResponseDTO } from './dtos/user.response.dto';

@Injectable()
export class UserById {
  constructor(
    // Inject the UserRepository service to use it
    @Inject(UserInfraestructure)
    private readonly repository: UserRepository,
  ) {}

  async findOne(id: string) {
    const user = await this.repository.findOne(id as string);

    const response = UserResponseDTO.fromDomainToResponse(user);
    return response;
  }
}

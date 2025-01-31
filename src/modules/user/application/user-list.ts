import { UserRepository } from '../domain/repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { UserInfraestructure } from '../infraestructure/user.infraestructure';
import { UserResponseDTO } from './dtos/user.response.dto';

@Injectable()
export class UserList {
  constructor(
    // Inject the UserRepository service to use it
    @Inject(UserInfraestructure)
    private readonly repository: UserRepository,
  ) {}

  async list() {
    const users = await this.repository.list();
    const response = UserResponseDTO.fromDomainToResponse(users);
    return response;
  }
}

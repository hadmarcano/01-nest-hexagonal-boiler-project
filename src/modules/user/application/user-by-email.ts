import { UserRepository } from '../domain/repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { UserInfraestructure } from '../infraestructure/user.infraestructure';
import { UserResponseDTO } from './dtos/user.response.dto';

@Injectable()
export class UserByEmail {
  constructor(
    // Inject the UserRepository service to use it
    @Inject(UserInfraestructure)
    private readonly repository: UserRepository,
  ) {}

  async findByEmail(email: string) {
    console.log('[LOG] 2 - application email', email);
    const user = await this.repository.findByEmail(email as string);
    const response = UserResponseDTO.fromDomainToResponse(user);
    return response;
  }
}

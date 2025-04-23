import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/roots/user';
import { UserInfraestructure } from '../infraestructure/user.infraestructure';
import { UserUpdateProperties } from '../domain/roots/interfaces/user.interface';

@Injectable()
export class UserUpdate {
  constructor(
    @Inject(UserInfraestructure)
    private readonly repository: UserRepository,
  ) {}

  async update(
    id: string,
    fieldsToUpdate: UserUpdateProperties,
  ): Promise<User> {
    // 1. Verificar existencia del usuario
    const existingUser = await this.repository.findOne(id);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // 2. Aplicar cambios desde el dominio
    existingUser.update(fieldsToUpdate);

    // 3. Persistir
    const updatedUser = await this.repository.save(existingUser);

    return updatedUser;
  }
}

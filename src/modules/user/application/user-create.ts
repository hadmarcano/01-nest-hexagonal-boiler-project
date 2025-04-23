import { User } from '../domain/roots/user';
import { UserRepository } from '../domain/repositories/user.repository';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserInfraestructure } from '../infraestructure/user.infraestructure';

@Injectable()
export class UserCreate {
  constructor(
    // Inject the UserRepository service to use it
    @Inject(UserInfraestructure)
    private readonly repository: UserRepository,
  ) {}

  async save(user: User) {
    console.log('[LOG] user', user);

    const userId = user['id'];
    const existing = await this.repository.findOne(userId);
    if (existing) {
      throw new ConflictException(`User with id ${userId} already exists`);
    }

    const userInserted = await this.repository.save(user as User);
    return userInserted;
  }
}

import { User } from '../domain/roots/user';
import { UserRepository } from '../domain/repositories/user.repository';

export class UserCreate {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async save(user: User) {
    const userInserted = await this.repository.save(user);
    return userInserted;
  }
}

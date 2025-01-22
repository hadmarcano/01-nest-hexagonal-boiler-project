import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/roots/user';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './user.entity';

export class UserInfraestructure implements UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly repository: Repository<UserEntity>,
    // In case of required to use a different manager
    // @Inject('USER_MANAGER')
    // private readonly manager: any,
  ) {}

  async save(user: User): Promise<User> {
    const userEntity = UserDto.fromDomainToData(user) as UserEntity;
    await this.repository.save(userEntity);
    return user;
  }

  findByEmail(email: string): Promise<User> {
    console.log(email);
    throw new Error('Method not implemented');
  }

  findByRefreshToken(refreshToken: string): Promise<User> {
    console.log(refreshToken);
    throw new Error('Method not implemented');
  }

  list(id: string): Promise<User[]> {
    console.log(id);
    throw new Error('Method not implemented');
  }

  listByPage(page: number, pageSize: number): Promise<User[]> {
    console.log(page, pageSize);
    throw new Error('Method not implemented');
  }

  delete(): Promise<void> {
    throw new Error('Method not implemented');
  }
}

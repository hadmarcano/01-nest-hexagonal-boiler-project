import { Inject } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
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

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { email } });
    if (!userEntity) {
      return null;
    }

    const user = UserDto.fromDataToDomain(userEntity) as User;

    return user;
  }

  async findOne(id: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { id, deletedAt: IsNull() },
    });
    if (!userEntity) {
      return null;
    }

    const response = UserDto.fromDataToDomain(userEntity) as User;

    return response;
  }

  async findByRefreshToken(refreshToken: string): Promise<User> {
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

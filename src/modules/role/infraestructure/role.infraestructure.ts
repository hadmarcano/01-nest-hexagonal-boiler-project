import { Repository } from 'typeorm';
import { RoleRepository } from '../domain/repositories/role.repository';
import { Role } from '../domain/role';
import { RoleEntity } from './entities/role.entity';
import { Inject } from '@nestjs/common';
import { RoleDto } from './dtos/role.dto';

export class RoleInfraestructure implements RoleRepository {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private readonly repository: Repository<RoleEntity>,
  ) {}

  async save(role: Role): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async update(role: Role): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async list(): Promise<Role[]> {
    const roles = await this.repository.find();
    return RoleDto.fromDataToDomain(roles) as Role[];
  }

  async delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

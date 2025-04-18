import { Role } from '../../domain/role';
import { RoleEntity } from '../entities/role.entity';

export class RoleDto {
  static fromDataToDomain(data: RoleEntity | RoleEntity[]): Role | Role[] {
    if (Array.isArray(data)) {
      return data.map((_) => RoleDto.fromDataToDomain(_)) as Role[];
    }

    return new Role(data.id, data.name);
  }
}

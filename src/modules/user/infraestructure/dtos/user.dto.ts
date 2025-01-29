import { RoleEntity } from '../../../role/infraestructure/entities/role.entity';
import { User } from '../../domain/roots/user';
import { UserEntity } from '../user.entity';

export class UserDto {
  // static method to convert a User to a UserEntity
  static fromDomainToData(data: User | User[]): UserEntity | UserEntity[] {
    if (Array.isArray(data)) {
      return data.map((item) => this.fromDomainToData(item)) as UserEntity[];
    }

    const {
      id,
      fullname,
      email,
      password,
      image,
      refreshToken,
      createdAt,
      updatedAt,
      deletedAt,
      roles,
      address,
    } = data.properties();

    const userEntity = new UserEntity();
    userEntity.id = id;
    userEntity.fullname = fullname;
    userEntity.email = email;
    userEntity.password = password;
    userEntity.image = image;
    userEntity.refreshToken = refreshToken;
    userEntity.createdAt = createdAt;
    userEntity.updatedAt = updatedAt;
    userEntity.deletedAt = deletedAt;
    userEntity.roles = roles.map(({ id, name }) => {
      const roleEntity = new RoleEntity();
      Object.assign(roleEntity, { id, name });
      return roleEntity;
    });
    userEntity.address = address;
    return userEntity;
  }

  // static fromDataToDomain.....

}

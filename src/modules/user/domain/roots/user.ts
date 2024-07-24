import { Role } from '../entities/role';
import { Address } from '../entities/address';
import {
  UserProperties,
  UserUpdateProperties,
} from './interfaces/user.interface';
// import { RoleEntity } from '../../../role/infraestructure/entities/role.entity';

export class User {
  private readonly id: string;
  private fullname: string;
  private image: string;
  private address: Address;
  private readonly email: string;
  private password: string;
  private refreshToken: string;
  private roles: Role[];
  private createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(props: UserProperties) {
    Object.assign(this, props);
    if (!props.createdAt) {
      this.createdAt = new Date();
    }
  }

  properties() {
    return {
      id: this.id,
      fullname: this.fullname,
      email: this.email,
      image: this.image,
      address: this.address,
      password: this.password,
      refreshToken: this.refreshToken,
      roles: this.roles,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(fieldsToUpdate: UserUpdateProperties) {
    Object.assign(this, fieldsToUpdate);
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}

import { Role } from '../entities/role';
import { UserProperties } from './interfaces/user.interface';

export class User {
  private readonly id: string;
  private fullname: string;
  private image: string;
  private readonly email: string;
  private password: string;
  private refreshToken: string;
  private roles: Role[];
  private createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(props: UserProperties) {
    Object.assign(this, props);
    this.createdAt = new Date();
  }

  //   static create(props: UserProperties): User {

  // IdVO.create(props.id);
  // RefrestokenVO.create(props.refreshToken);
  // FullnameVO.create(props.fullname);
  // RolesVo.create(props.roles);
  // EmailVO.create(props.email);

  // return new User(props);
  //   }

  properties() {
    return {
      id: this.id,
      fullname: this.fullname,
      email: this.email,
      image: this.image,
      password: this.password,
      refreshToken: this.refreshToken,
      roles: this.roles,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}

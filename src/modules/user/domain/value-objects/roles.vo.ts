import { Role } from '../entities/role';

export class RolesVo {
  private readonly value: Role[];

  private constructor(value: Role[]) {
    this.value = value;
  }

  static create(value: Role[]): RolesVo {
    if (value.length === 0) {
      throw new Error('Invalid roles');
    }

    return new RolesVo(value);
  }
}

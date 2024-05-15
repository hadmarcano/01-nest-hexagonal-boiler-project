import { Role } from '../domain/entities/role';

export class UserEntity {
  id: string;
  fullname: string;
  email: string;
  password: string;
  image: string;
  refresToken: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  roles: Role[];
}

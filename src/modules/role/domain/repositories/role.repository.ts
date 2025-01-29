import { Role } from '../role';

export interface RoleRepository {
  save(role: Role): Promise<Role>;
  update(role: Role): Promise<Role>;
  findById(id: string): Promise<Role>;
  list(): Promise<Role[]>;
  delete(): Promise<void>;
}

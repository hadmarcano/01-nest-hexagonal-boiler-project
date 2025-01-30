import { User } from '../roots/user';

// Design Pattern: Facade
export interface UserRepository {
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findOne(id: string): Promise<User | null>;
  findByRefreshToken(refreshToken: string): Promise<User>;
  list(id: string): Promise<User[]>;
  listByPage(page: number, pageSize: number): Promise<User[]>;
  delete(id: string): Promise<void>;
}

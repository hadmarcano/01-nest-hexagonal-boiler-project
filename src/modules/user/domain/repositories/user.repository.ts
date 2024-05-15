import { User } from '../roots/user';

// Design Pattern: Facade
export interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findByRefreshToken(refreshToken: string): Promise<User | null>;
  list(): Promise<User[]>;
  listByPage(page: number, pageSize: number): Promise<User[]>;
  delete(id: string): Promise<void>;
}

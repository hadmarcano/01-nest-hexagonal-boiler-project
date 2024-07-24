import { Address } from '../../entities/address';

export interface UserEssentials {
  readonly fullname: string;
  readonly image: string;
  readonly email: string;
  readonly password: string;
  readonly refreshToken: string;
  readonly roles: any[];
}

export interface UserOptionals {
  readonly id: string;
  readonly address: Address;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}

export type UserProperties = UserEssentials & Partial<UserOptionals>;

export type UserUpdateProperties = Partial<
  Omit<UserEssentials, 'refreshToken'> &
    Omit<UserOptionals, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
>;

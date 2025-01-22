import { UserEntity } from '../user.entity';

// Design Pattern: Provider
export const userProviders = [
  {
    // For pre-fabricated queries
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE_POSTGRES'],
  },
  {
    // For custom SQL queries
    provide: 'USER_MANAGER',
    useFactory: (dataSource) => dataSource.manager,
    inject: ['DATA_SOURCE_POSTGRES'],
  },
];

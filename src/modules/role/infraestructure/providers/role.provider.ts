import { RoleEntity } from '../entities/role.entity';

// Design Pattern: Provider
export const roleProviders = [
  {
    // For pre-fabricated queries
    provide: 'ROLE_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(RoleEntity),
    inject: ['DATA_SOURCE_POSTGRES'],
  },
  {
    // For custom SQL queries
    provide: 'ROLE_MANAGER',
    useFactory: (dataSource) => dataSource.manager,
    inject: ['DATA_SOURCE_POSTGRES'],
  },
];

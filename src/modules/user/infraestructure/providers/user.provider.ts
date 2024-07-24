import { UserEntity } from '../user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource) => dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USER_MANAGER',
    useFactory: (dataSource) => dataSource.manager,
    inject: ['DATA_SOURCE'],
  },
];

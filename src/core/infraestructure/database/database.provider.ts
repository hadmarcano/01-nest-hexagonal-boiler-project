import { UserEntity } from 'src/modules/user/infraestructure/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE_POSTGRESQL',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'user',
        password: 'mypass',
        database: 'postgresdb',
        entities: [
          // __dirname + '/../../../modules/**/infraestructura/*.entity{.ts,.js}',
          UserEntity,
        ],
        synchronize: true, // Dev
        logging: true, // Dev
      });

      return dataSource.initialize();
    },
  },
];

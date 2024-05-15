import { Module } from '@nestjs/common';
// import { DataSource } from 'typeorm';
import { databaseProviders } from './database.provider';

@Module({
  providers: [
    ...databaseProviders,
    // {
    //   provide: 'DATA_SOURCE_POSTGRESQL',
    //   useFactory: async () => {
    //     const dataSource = new DataSource({
    //       type: 'postgres',
    //       host: 'localhost',
    //       port: 5432,
    //       username: 'user',
    //       password: 'mypass',
    //       database: 'postgresdb',
    //       entities: [],
    //       synchronize: true, // Dev
    //       logging: true, // Dev
    //     });

    //     return dataSource.initialize();
    //   },
    // },
  ],
  exports: [...databaseProviders],
})
export class DatabaseModule {}

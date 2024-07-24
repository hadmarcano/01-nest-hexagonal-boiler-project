import { Module } from '@nestjs/common';
// import { DataSource } from 'typeorm';
import { databaseProviders } from './database.provider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}

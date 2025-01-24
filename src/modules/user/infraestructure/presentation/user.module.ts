import { Module } from '@nestjs/common';
import { UserController } from './http/user.controller';
import { DatabaseModule } from 'src/core/infraestructure/database/database.module';
import { userProviders } from '../providers/user.provider';
import { UserCreate } from '../../application/user-create';

const userApplications = [UserCreate];

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, ...userApplications],
})
export class UserModule {}

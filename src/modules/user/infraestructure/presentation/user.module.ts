import { Module } from '@nestjs/common';
import { UserController } from './http/user.controller';
import { DatabaseModule } from 'src/core/infraestructure/database/database.module';
import { userProviders } from '../providers/user.provider';
import { UserCreate } from '../../application/user-create';
import { UserByEmail } from '../../application/user-by-email';
import { UserInfraestructure } from '../user.infraestructure';

const userApplications = [UserCreate, UserByEmail];

const userInfraestructures = [UserInfraestructure];

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, ...userApplications, ...userInfraestructures],
})
export class UserModule {}

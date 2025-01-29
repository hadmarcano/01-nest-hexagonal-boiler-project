import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/infraestructure/database/database.module';
import { RoleController } from './http/role.controller';
import { roleProviders } from '../providers/role.provider';
import { RoleInfraestructure } from '../role.infraestructure';
import { RoleList } from '../../application/role-list';

const roleApplications = [RoleList];

const roleInfraestructures = [RoleInfraestructure];

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [...roleProviders, ...roleApplications, ...roleInfraestructures],
})
export class RoleModule {}

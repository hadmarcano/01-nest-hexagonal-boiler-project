import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/infraestructure/database/database.module';
import { scheduleProviders } from '../providers/schedule.provider';
import { ScheduleApplication } from '../../application/schedule.application';
import { ScheduleInfraestructure } from '../schedule.infraestructure';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleController } from './http/schedule.controller';

const scheduleApplications = [ScheduleApplication];

const scheduleInfraestructures = [ScheduleInfraestructure];

const otherProviders = [...scheduleProviders];

@Module({
  imports: [DatabaseModule, CqrsModule],
  controllers: [ScheduleController],
  providers: [
    ...scheduleApplications,
    ...scheduleInfraestructures,
    ...otherProviders,
  ],
})
export class ScheduleModule {}

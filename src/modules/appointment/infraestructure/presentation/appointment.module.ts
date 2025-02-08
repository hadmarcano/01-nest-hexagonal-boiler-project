import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppointmentController } from './appointment.controller';
import { AppointmentCLCommandHandler } from '../../application/commands/appointment.cl.command';
import { AppointmentCOCommandHandler } from '../../application/commands/appointment.co.command';
import { AppointmentMXCommandHandler } from '../../application/commands/appointment.mx.command';

const application = [
  AppointmentCLCommandHandler,
  AppointmentCOCommandHandler,
  AppointmentMXCommandHandler,
];

@Module({
  imports: [CqrsModule.forRoot()],
  controllers: [AppointmentController],
  providers: [...application],
})
export class AppointmentModule {}

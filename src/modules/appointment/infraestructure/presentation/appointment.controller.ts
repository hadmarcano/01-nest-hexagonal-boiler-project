import { Body, Controller, Post } from '@nestjs/common';
import { AppointmentCLCommand } from '../../application/commands/appointment.cl.command';
import { AppointmentCOCommand } from '../../application/commands/appointment.co.command';
import { AppointmentMXCommand } from '../../application/commands/appointment.mx.command';
import { CommandBus } from '@nestjs/cqrs';
import { AppointmentDTO } from './dtos/appointment.create.dto';

/* The `AppointmentController` class in TypeScript defines a controller for handling appointment
creation requests, utilizing a command pattern with country-specific commands. */
const countryCommands = {
  CL: AppointmentCLCommand,
  CO: AppointmentCOCommand,
  MX: AppointmentMXCommand,
};

@Controller('appointment')
export class AppointmentController {
  // Receives an Injection Dependency
  constructor(private readonly commandBus: CommandBus) {}

  /* The `@Post('appointment')` decorator in the `createAppointment` method of the
  `AppointmentController` class is specifying that this method should handle POST requests to the
  '/appointment' endpoint. */
  @Post('')
  async createAppointment(@Body() appointment: AppointmentDTO) {
    // console.log('[LOG] AppointmentController', appointment);

    /* The `const command = new countryCommands[appointment.countryIso]()` line in the
   `createAppointment` method of the `AppointmentController` class is dynamically creating an
   instance of a country-specific command based on the `countryIso` property of the `appointment`
   object. */
    const command = new countryCommands[appointment.countryIso](
      appointment.patientId,
      appointment.doctorId,
      appointment.specialityId,
      appointment.centerId,
      appointment.date,
    );

    /* `return this.commandBus.execute(command);` is executing the specified command using the
    `commandBus` instance. In this context, the `commandBus` is an instance of the CommandBus class
    from the `@nestjs/cqrs` library, which is responsible for handling and executing commands in a
    Command Query Responsibility Segregation (CQRS) architecture. */
    const response = await this.commandBus.execute(command);

    return {
      idReturned: response,
    };
  }
}

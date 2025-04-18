import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Appointment } from '../../domain/appointment';

// Define the structure of the command
export class AppointmentCLCommand implements ICommand {
  constructor(
    public readonly patientId: string,
    public readonly doctorId: string,
    public readonly specialityId: string,
    public readonly centerId: number,
    public readonly date: Date,
  ) {}
}

// Define the handler for the command
@CommandHandler(AppointmentCLCommand)
export class AppointmentCLCommandHandler
  implements ICommandHandler<AppointmentCLCommand>
{
  async execute(command: AppointmentCLCommand) {
    console.log('[LOG] AppointmentCLCommandHandler', command);

    const { patientId, doctorId, specialityId, centerId, date } = command;

    // TODO: Implement the command handler logic
    const appointment = new Appointment(
      patientId,
      doctorId,
      date,
      specialityId,
      centerId,
      'CL',
    );

    return appointment.properties.id;
  }
}

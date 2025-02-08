import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Appointment } from '../../domain/appointment';

// Define the structure of the command
export class AppointmentMXCommand implements ICommand {
  constructor(
    public readonly patientId: string,
    public readonly doctorId: string,
    public readonly specialityId: string,
    public readonly centerId: number,
    public readonly date: Date,
  ) {}
}

// Define the handler for the command
@CommandHandler(AppointmentMXCommand)
export class AppointmentMXCommandHandler
  implements ICommandHandler<AppointmentMXCommand>
{
  async execute(command: AppointmentMXCommand) {
    console.log('[LOG] AppointmentCOCommandHandler', command);

    const { patientId, doctorId, specialityId, centerId, date } = command;

    // TODO: Implement the command handler logic
    const appointment = new Appointment(
      patientId,
      doctorId,
      date,
      specialityId,
      centerId,
      'MX',
    );

    return appointment.properties.id;
  }
}

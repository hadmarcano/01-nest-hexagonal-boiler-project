import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Appointment } from '../../domain/appointment';

// Define the structure of the command
export class AppointmentCOCommand implements ICommand {
  constructor(
    public readonly patientId: string,
    public readonly doctorId: string,
    public readonly specialityId: string,
    public readonly centerId: number,
    public readonly date: Date,
  ) {}
}

// Define the handler for the command
@CommandHandler(AppointmentCOCommand)
export class AppointmentCLCommandHandler
  implements ICommandHandler<AppointmentCOCommand>
{
  constructor(private readonly command: AppointmentCOCommand) {}

  async execute() {
    console.log('[LOG] AppointmentCOCommandHandler', this.command);

    const { patientId, doctorId, specialityId, centerId, date } = this.command;

    // TODO: Implement the command handler logic
    const appointment = new Appointment(
      patientId,
      doctorId,
      date,
      specialityId,
      centerId,
      'CO',
    );

    return appointment.properties.id;
  }
}

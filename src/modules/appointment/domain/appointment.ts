import { v4 as uuidv4, validate } from 'uuid';

export class Appointment {
  private readonly id: string;
  private patientId: string;
  private doctorId: string;
  private date: Date;
  private specialityId: string;
  private centerId: number;
  private countryIso: 'CL' | 'CO' | 'MX';

  constructor(
    patientId: string,
    doctorId: string,
    date: Date,
    specialityId: string,
    centerId: number,
    countryIso: 'CL' | 'CO' | 'MX',
  ) {
    if (!validate(patientId)) {
      throw new Error('Invalid patientId');
    }

    if (!validate(doctorId)) {
      throw new Error('Invalid doctorId');
    }

    if (!Number.isInteger(centerId)) {
      throw new Error('Invalid centerId');
    }

    if (Number(centerId) <= 0) {
      throw new Error('Invalid centerId');
    }

    if (!date) {
      throw new Error('Invalid date');
    }

    this.id = uuidv4();
    this.patientId = patientId;
    this.doctorId = doctorId;
    this.date = date;
    this.specialityId = specialityId;
    this.centerId = centerId;
    this.countryIso = countryIso;
  }

  // Getters dont receive any parameters
  // Getters are invoked when you call the property without parenthesis (ex: Appointment.properties)
  get properties() {
    return {
      id: this.id,
      patientId: this.patientId,
      doctorId: this.doctorId,
      date: this.date,
      specialityId: this.specialityId,
      centerId: this.centerId,
      countryIso: this.countryIso,
    };
  }
}

import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class AppointmentDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  patientId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  doctorId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  specialityId: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number) // Transform the number to a number
  centerId: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date) // Transform the date to a date
  date: Date;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['CL', 'CO', 'MX'])
  countryIso: string;
}

import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CourseIdDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}

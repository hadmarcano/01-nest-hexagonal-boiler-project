import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CourseUpdateDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;
}

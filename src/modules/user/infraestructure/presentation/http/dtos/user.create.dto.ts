import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserCreateDTO {
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password for the user account',
    required: true,
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'USER',
    description: 'The role of the user',
    required: true,
    enum: ['USER', 'ADMIN', 'TEACHER'],
  })
  @IsString()
  @IsNotEmpty()
  role: string;
}

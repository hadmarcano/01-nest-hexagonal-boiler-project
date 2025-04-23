import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @ApiProperty({
    example: 'John Updated',
    description: 'The updated full name of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'john.updated@example.com',
    description: 'The updated email address of the user',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'USER',
    description: 'The updated role of the user',
    required: false,
    enum: ['USER', 'ADMIN', 'TEACHER'],
  })
  @IsString()
  @IsOptional()
  role?: string;
}

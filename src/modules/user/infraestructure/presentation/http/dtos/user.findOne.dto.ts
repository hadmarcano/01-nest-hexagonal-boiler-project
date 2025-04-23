import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UserFindOneDTO {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique identifier of the user',
    required: true,
  })
  @IsUUID()
  userId: string;
}

import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserGetOneDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}

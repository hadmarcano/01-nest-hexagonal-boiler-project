import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserFindOneDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}

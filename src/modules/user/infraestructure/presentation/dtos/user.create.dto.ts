import { Type } from 'class-transformer';

export class UserCreateDTO {
  @Type(() => String)
  name: string;

  @Type(() => String)
  email: string;

  @Type(() => String)
  password: string;
}

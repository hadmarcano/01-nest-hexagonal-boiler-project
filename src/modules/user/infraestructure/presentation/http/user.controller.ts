// User Controller
import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { UserCreateDTO } from '../dtos/user.create.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() user: UserCreateDTO): Promise<void> {
    throw new HttpException('Method not implemented', 501);
  }
}

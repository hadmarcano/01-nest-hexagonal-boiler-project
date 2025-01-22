// User Controller
import { Controller, Post, Body, HttpException } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() user: any): Promise<void> {
    throw new HttpException('Method not implemented', 501);
  }
}

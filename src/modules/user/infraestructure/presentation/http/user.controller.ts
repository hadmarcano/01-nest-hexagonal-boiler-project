// User Controller
import { Controller, Post, Body } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() user: any): Promise<void> {
    throw new Error(`Method not implemented`);
  }
}

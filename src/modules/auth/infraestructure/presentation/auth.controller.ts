import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {
    // por definir
  }

  @Post('/login')
  Login(auth: any) {
    // por definir
  }
}

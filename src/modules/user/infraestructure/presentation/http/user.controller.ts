// User Controller
import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { UserCreateDTO } from '../dtos/user.create.dto';
import { UserProperties } from 'src/modules/user/domain/roots/interfaces/user.interface';
import { UserFactory } from 'src/modules/user/domain/roots/user.factory';
import { UserCreate } from 'src/modules/user/application/user-create';
import { UserByEmail } from 'src/modules/user/application/user-by-email';

@Controller('users')
export class UserController {
  // Inject the UserCreate service
  constructor(
    private readonly userCreate: UserCreate,
    private readonly userFindByEmail: UserByEmail,
  ) {}

  @Post()
  async create(@Body() body: UserCreateDTO) {
    // Pasos de un enfoque DDD
    // 1. Validar que el objeto(dominio) recibido sea válido (Validas el negocio)
    console.log('[LOG] body', body);
    const userProperties: UserProperties = body;

    console.log('[LOG] UserCreateDTO', userProperties);

    // 2. Crear el objeto User (Validas las reglas de negocio/dominio)
    // 3. Validar que el objeto User sea válido (El factory tambien tiene el control de errores)
    const user = UserFactory.create(userProperties);

    console.log('[LOG] UserFactory', userProperties);
    // 4. Guardar el objeto User
    await this.userCreate.save(user);

    return body;
  }

  @Get()
  async findByEmail(@Query('email') email: string) {
    // Pasos de un enfoque DDD
    // 1. Validar que el objeto(dominio) recibido sea válido (Validas el negocio)
    console.log('[LOG] 1 - email controller', email);
    const user = await this.userFindByEmail.findByEmail(email);

    console.log('[LOG] 4- UserFindByEmail', user);

    return user;
  }
}

// User Controller
import { Controller, Post, Body } from '@nestjs/common';
import { UserCreateDTO } from '../dtos/user.create.dto';
import { UserProperties } from 'src/modules/user/domain/roots/interfaces/user.interface';
import { UserFactory } from 'src/modules/user/domain/roots/user.factory';
import { UserCreate } from 'src/modules/user/application/user-create';

@Controller('users')
export class UserController {
  // Inject the UserCreate service
  constructor(private readonly userCreate: UserCreate) {}

  @Post()
  async create(@Body() body: UserCreateDTO) {
    // Pasos de un enfoque DDD
    // 1. Validar que el objeto(dominio) recibido sea válido (Validas el negocio)
    const userProperties: UserProperties = body;

    // 2. Crear el objeto User (Validas las reglas de negocio/dominio)
    // 3. Validar que el objeto User sea válido (El factory tambien tiene el control de errores)
    const user = UserFactory.create(userProperties);

    // 4. Guardar el objeto User
    await this.userCreate.save(user);

    return body;
  }
}

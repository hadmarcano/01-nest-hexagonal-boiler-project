// User Controller
import { Controller, Post, Body, Query, Get, Param } from '@nestjs/common';
import { UserCreateDTO } from '../dtos/user.create.dto';
import { UserProperties } from 'src/modules/user/domain/roots/interfaces/user.interface';
import { UserFactory } from 'src/modules/user/domain/roots/user.factory';
import { UserCreate } from 'src/modules/user/application/user-create';
import { UserByEmail } from 'src/modules/user/application/user-by-email';
import { UserById } from 'src/modules/user/application/user-by-id';
import { UserFindOneDTO } from '../dtos/user.findOne.dto';
import { UserList } from 'src/modules/user/application/user-list';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  // Inject the UserCreate service
  constructor(
    private readonly userCreate: UserCreate,
    private readonly userFindByEmail: UserByEmail,
    private readonly userFindOne: UserById,
    private readonly userList: UserList,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
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
  @ApiOperation({ summary: 'List users' })
  async list() {
    const user = await this.userList.list();

    return user;
  }

  @Get()
  @ApiOperation({ summary: 'Find user by email' })
  async findByEmail(@Query('email') email: string) {
    const user = await this.userFindByEmail.findByEmail(email);

    return user;
  }

  @Get('/:userId')
  @ApiOperation({ summary: 'Find user by id' })
  async findOne(@Param() params: UserFindOneDTO) {
    const { userId } = params;
    const user = await this.userFindOne.findOne(userId);
    return user;
  }
}

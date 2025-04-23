// User Controller
import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  UserProperties,
  UserUpdateProperties,
} from 'src/modules/user/domain/roots/interfaces/user.interface';
import { UserFactory } from 'src/modules/user/domain/roots/user.factory';
import { UserCreate } from 'src/modules/user/application/user-create';
import { UserByEmail } from 'src/modules/user/application/user-by-email';
import { UserById } from 'src/modules/user/application/user-by-id';
import { UserList } from 'src/modules/user/application/user-list';
import { UserUpdate } from 'src/modules/user/application/user-update';
import { UserCreateDTO } from '../dtos/user.create.dto';
import { UserFindOneDTO } from '../dtos/user.findOne.dto';
import { UserUpdateDto } from '../dtos/user.update.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CryptService } from 'src/core/infraestructure/presentation/services/crypt.service';
import { Roles } from 'src/core/infraestructure/presentation/decorators/roles';
import { RoleEnum } from 'src/core/infraestructure/presentation/decorators/enums/role.enum';
import { AuthorizationGuard } from 'src/core/infraestructure/presentation/guards/authorization.guard';
import { AuthenticationGuard } from 'src/core/infraestructure/presentation/guards/authentication.guard';

@ApiTags('User')
@Controller('users')
export class UserController {
  // Inject the UserCreate service
  constructor(
    private readonly userCreate: UserCreate,
    private readonly userFindByEmail: UserByEmail,
    private readonly userFindOne: UserById,
    private readonly userList: UserList,
    private readonly userUpdate: UserUpdate,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() body: UserCreateDTO) {
    // Pasos de un enfoque DDD
    // 1. Validar que el objeto(dominio) recibido sea válido (Validas el negocio)
    console.log('[LOG] body', body);
    const userProperties: UserProperties = {
      ...body,
      password: await CryptService.hashPassword(body.password),
    };

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
  @Roles(RoleEnum.ADMIN, RoleEnum.TEACHER)
  @UseGuards(AuthorizationGuard, AuthenticationGuard)
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

  @Put(':userId')
  async update(@Param() params: UserFindOneDTO, @Body() dto: UserUpdateDto) {
    const { userId } = params;
    return this.userUpdate.update(userId, dto as UserUpdateProperties);
  }
}

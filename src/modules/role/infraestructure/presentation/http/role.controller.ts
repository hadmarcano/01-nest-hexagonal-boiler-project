import { Controller, Get } from '@nestjs/common';
import { RoleList } from 'src/modules/role/application/role-list';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Role')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleList: RoleList) {}

  @Get()
  @ApiOperation({ summary: 'List roles' })
  async list() {
    return this.roleList.list();
  }
}

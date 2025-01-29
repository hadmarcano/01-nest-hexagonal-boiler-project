import { Controller, Get } from '@nestjs/common';
import { RoleList } from 'src/modules/role/application/role-list';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleList: RoleList) {}

  @Get()
  async list() {
    return this.roleList.list();
  }
}

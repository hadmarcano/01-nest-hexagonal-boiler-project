import { Inject, Injectable } from '@nestjs/common';
import { RoleRepository } from '../domain/repositories/role.repository';
import { RoleInfraestructure } from '../infraestructure/role.infraestructure';

@Injectable()
export class RoleList {
  constructor(
    // Inject the RoleRepository service to use it
    @Inject(RoleInfraestructure)
    private readonly repository: RoleRepository,
  ) {}

  async list() {
    console.log('[LOG] 1 - application list');
    const roles = await this.repository.list();
    return roles;
  }
}

import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from '@nestjs/core';


@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    throw new Error('Method not implemented.');
  }
}

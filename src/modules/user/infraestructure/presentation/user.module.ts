import { Module } from '@nestjs/common';
import { UserController } from './http/user.controller';
import { DatabaseModule } from 'src/core/infraestructure/database/database.module';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [DatabaseModule],
})
export class UserModule {}

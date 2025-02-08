import { Module } from '@nestjs/common';
import { AppService } from './playground/app.service';
import { UserModule } from './modules/user/infraestructure/presentation/user.module';
import { RoleModule } from './modules/role/infraestructure/presentation/role.module';
import { AppointmentModule } from './modules/appointment/infraestructure/presentation/appointment.module';

@Module({
  imports: [AppointmentModule, RoleModule, UserModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

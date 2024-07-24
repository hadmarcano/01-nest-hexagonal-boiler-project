import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { StudentModule } from './student/student.module';
import { UserModule } from './modules/user/infraestructure/presentation/user.module';
// import { DatabaseModule } from './core/infraestructure/database/database.module';

@Module({
  imports: [
    // StudentModule,
    // DatabaseModule,
    UserModule,
  ],
  controllers: [
    // AppController
  ],
  providers: [AppService],
})
export class AppModule {}

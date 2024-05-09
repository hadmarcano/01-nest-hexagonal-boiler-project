import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { EnrollService } from './enroll.service';

@Module({
  imports: [],
  controllers: [StudentController],
  providers: [
    // Forma 1 : StudentService es un token de referencia de la clase del StudentService
    // StudentService,
    // {
    //   // Forma 1 : No implicita
    //   provide: StudentService,
    //   useClass: StudentService,
    // },
    EnrollService,
    {
      // Forma 1 : No implicita
      provide: 'STUDENT',
      useClass: StudentService,
    },
    {
      // Disponibilizando valores mediante injeccion de dependencias
      provide: 'CONFIG',
      useValue: {
        url: 'http://localhost:3000',
      },
    },
    {
      provide: 'ENVIRONMENT',
      useValue: process.env.NODE_ENV || 'dev',
    },
    {
      provide: 'CONFIG2',
      useFactory: (config) => ({ ...config, port: 4000 }),
    },
    {
      provide: 'CONFIG3',
      useFactory: (env, config) => {
        return {
          url: env === 'dev' ? `${config.url}/dev` : `${config.url}`,
          urlConfig: config.url,
        };
      },
      inject: ['ENVIRONMENT', 'CONFIG'],
    },
    {
      provide: 'CONFIG4',
      useValue: {
        serverOAuth2: 'https://server-oauth2/callback',
      },
    },
  ],
})
export class StudentModule {}

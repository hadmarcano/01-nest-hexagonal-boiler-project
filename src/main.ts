import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: false,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: errors,
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: '1',
  //   prefix: 'api',
  // });

  // app.enableSwagger({
  //   title: 'Nest AppCourse',
  //   description: 'Nest AppCourse',
  //   version: '1.0',
  //   // prefix: 'api',
  // });

  await app.listen(3000);
}
bootstrap();

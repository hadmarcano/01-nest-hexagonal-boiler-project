import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activating the versioning of the API
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  console.log('[LOG] Versioning Enabled');

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Nest AppCourse')
    .setDescription('Nest AppCourse Advaced')
    .setVersion('1.0')
    .addTag('v1')
    .build();

  // console.log('[LOG] Swagger Enabled');

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  // console.log('[LOG] Swagger Document Created');

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  // console.log('[LOG] Swagger Setup');

  // app.setGlobalPrefix('api/v1');
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

  await app.listen(3000);
}
bootstrap();

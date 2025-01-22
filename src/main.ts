import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors();

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

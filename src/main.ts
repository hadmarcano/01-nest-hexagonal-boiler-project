import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { generateOpenApiSpec } from './utils/generate-openapi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activating the versioning of the API
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  console.log('[LOG] Versioning Enabled');

  // Generate and save OpenAPI specification
  const document = generateOpenApiSpec(app);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

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

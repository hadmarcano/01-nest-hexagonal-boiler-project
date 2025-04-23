import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function generateOpenApiSpec(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Nest AppCourse')
    .setDescription('Nest AppCourse Advanced')
    .setVersion('1.0')
    .addTag('v1')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  // Save JSON specification
  const jsonOutputPath = path.resolve(process.cwd(), 'openapi-spec.json');
  fs.writeFileSync(jsonOutputPath, JSON.stringify(document, null, 2));
  console.log(`[LOG] OpenAPI JSON specification saved to ${jsonOutputPath}`);

  // Convert to YAML and save
  const yamlOutputPath = path.resolve(process.cwd(), 'openapi-spec.yaml');
  const yamlSpec = yaml.dump(document, {
    indent: 2,
    lineWidth: -1, // No line wrapping
  });
  fs.writeFileSync(yamlOutputPath, yamlSpec);
  console.log(`[LOG] OpenAPI YAML specification saved to ${yamlOutputPath}`);

  return document;
} 
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Envoy API')
    .setDescription('Envoy API description')
    .setVersion('1.0')
    .addTag('envoy')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  dotenv.config();
  app.useGlobalPipes(new ValidationPipe());
  //await app.listen(8090 || 3000);
  await app.listen(3000);
}
bootstrap();

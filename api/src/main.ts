/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //   app.enableCors({
  //   origin: ['http://localhost:4221', 'http://192.168.1.16:4221'],
  //   credentials: true,
  // });
  app.enableCors({
    origin: ['http://localhost:4221', 'http://192.168.1.16:4221', 'http://192.168.1.16:4222','http://localhost:4222'],
    credentials: true,
  })
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3001;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

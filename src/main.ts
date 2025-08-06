import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos que não estão no DTO
      forbidNonWhitelisted: true, // Rejeita campos extras
      transform: true, // Transforma tipos (ex: id string => number)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

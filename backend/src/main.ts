import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  console.log('=== ENVIRONMENT VARIABLES CHECK ===');
  console.log('SECRET_KEY exists:', !!process.env.SECRET_KEY);
  console.log('SECRET_KEY length:', process.env.SECRET_KEY?.length);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('=====================================');

  app.enableCors({
    origin: [
      'http://localhost:3000', // Local frontend
      'http://localhost:3001', // Docker frontend
      'https://your-frontend.com', // Production frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // hanya field yang ada di DTO
      forbidNonWhitelisted: true, // error kalau ada field tambahan
      transform: true, // otomatis konversi type (string → number)
      transformOptions: {
        enableImplicitConversion: true, // konversi otomatis string->number
      },
    }),
  );
  app.useStaticAssets(resolve(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

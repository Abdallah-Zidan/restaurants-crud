import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3333;

  const app = await NestFactory.create(AppModule);

  //* enable api versioning and default to version 1
  //* all endpoints will be prefixed by v<version number> example: api/v1/users
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(helmet()); //*a middleware that sets some security related headers

  //* refer to .env and .env.example files to add or remove other allowed origins
  const allowedOrigins = (
    process.env.ALLOWED_ORIGINS || `http://localhost:${port}`
  )
    .split(',')
    .map((o) => o.trim());

  app.enableCors({ origin: allowedOrigins });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, errorHttpStatusCode: 422 }),
  );
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();

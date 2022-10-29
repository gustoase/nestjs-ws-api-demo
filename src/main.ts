import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { ValidationPipe } from '@nestjs/common';
import validationConfig from './config/validation.config';

async function bootstrap() {
  const isDev = process.env.NODE_ENV === 'development';

  let httpsOptions;
  // на окружениях HTTPS настраивается на уровне nginx
  if (isDev) {
    httpsOptions = {
      key: readFileSync(process.env.SSL_KEY_PATH),
      cert: readFileSync(process.env.SSL_CERT_PATH),
    } as HttpsOptions;
  }

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.useGlobalPipes(new ValidationPipe(validationConfig));
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*' });

  const config = new DocumentBuilder()
    .setTitle('REST Api')
    .setDescription('The ws API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();

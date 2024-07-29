/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as expresshba from 'express-handlebars';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('hbs'); // Tipo de engine de views.
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // Diretório onde se terá as views.
  app.engine(
    'hbs',
    expresshba.engine({
      extname: 'hbs',
      defaultLayout: 'main',
      partialsDir: 'views/partials',
    }),
  ); // Layout prinicipal: layout que todas as views vão carregar.
  // Partial: layouts criados que podem ser reutilizados.
  await app.listen(3000);
}
bootstrap();

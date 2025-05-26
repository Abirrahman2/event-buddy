import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService=app.get(ConfigService);
   const config = new DocumentBuilder()
    .setTitle('EVENT BUDDY')
    .setDescription('Discover Amazing Events')
    .setVersion('1.0')
    .addTag('EVENT BUDDY')
    .addBearerAuth(
      {type:'http',scheme:'bearer',bearerFormat:'JWT'},
      'JWT',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      if (errors.length) {
        let messages = [];

        for (let item of errors) {
          let single = {};
          let constraints = Object.values(item.constraints)
          single[item.property] = constraints;
          messages.push(single);
        }

        throw new BadRequestException({
          error: 'Bad Request Exception',
          messages,
          code: 422
        })
      }
    },
  }));

  app.enableCors({
    origin: ['http://localhost:3001', 'http://192.168.0.115:3001']
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
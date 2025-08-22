import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { MicroservicesModule } from './microservices.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MicroservicesModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  });

  await app.listen();
  console.log('Products microservice is listening on port 3001');
}

bootstrap();
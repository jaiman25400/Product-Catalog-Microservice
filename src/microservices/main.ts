import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { MicroservicesModule } from './microservices.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MicroservicesModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0', // Changed from 'localhost' to '0.0.0.0' for Docker
      port: 3001,
    },
  });

  // Add a simple health check message
  console.log('Products microservice is listening on port 3001');

  await app.listen();
}
bootstrap();
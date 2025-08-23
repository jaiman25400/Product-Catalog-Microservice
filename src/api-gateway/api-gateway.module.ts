import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiGatewayController } from './api-gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.MICROSERVICE_HOST || 'localhost',
          port: parseInt(process.env.MICROSERVICE_PORT || '3001'),
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
})
export class ApiGatewayModule {}
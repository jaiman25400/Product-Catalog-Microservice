import { Module } from '@nestjs/common';
import { MicroservicesModule } from './microservices/microservices.module';
import { ApiGatewayModule } from './api-gateway/api-gateway.module';

@Module({
  imports: [MicroservicesModule, ApiGatewayModule],
})
export class AppModule {}
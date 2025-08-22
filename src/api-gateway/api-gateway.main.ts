import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { RpcExceptionFilter } from 'src/filters/rpc-exception.filter';
import { RpcErrorInterceptor } from 'src/interceptors/rpc-error.interceptor';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  // Apply global filter
  app.useGlobalFilters(new RpcExceptionFilter());

  // Apply global interceptor
  app.useGlobalInterceptors(new RpcErrorInterceptor());

  // Enhanced global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // Enable type conversion
      },
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          const constraints = error.constraints;
          return {
            field: error.property,
            errors: constraints ? Object.values(constraints) : [],
            value: error.value,
          };
        });
        return new BadRequestException({
          message: 'Validation failed',
          details: messages,
          timestamp: new Date().toISOString(),
        });
      },
    }),
  );

  await app.listen(3000);

  console.log('API Gateway is running on port : 3000');
}

bootstrap();

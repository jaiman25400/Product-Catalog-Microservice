import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  @MessagePattern({ cmd: 'hello' })
  hello(): string {
    return 'Hello from Products Microservice!';
  }
}

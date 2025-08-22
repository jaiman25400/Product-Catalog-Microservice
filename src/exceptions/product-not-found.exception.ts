import { HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class ProductNotFoundException extends RpcException {
  constructor(productId: string) {
    super({
      message: `Product with ID ${productId} not found`,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}

export class InvalidProductDataException extends RpcException {
  constructor(message: string) {
    super({
      message: `Invalid product data: ${message}`,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
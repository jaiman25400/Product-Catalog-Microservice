import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { throwError } from 'rxjs';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(RpcExceptionFilter.name);

  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const error = exception.getError();

    this.logger.error('RpcException caught:', error);

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: any = null;

    // Handle different error formats
    if (typeof error === 'object' && error !== null) {
      const errorObj = error as any;
      
      // Check if it has statusCode and message properties
      if (typeof errorObj.statusCode === 'number') {
        statusCode = errorObj.statusCode;
      }
      
      if (typeof errorObj.message === 'string') {
        message = errorObj.message;
      } else if (typeof errorObj.message === 'object') {
        // Handle nested message objects
        message = errorObj.message.message || message;
        details = errorObj.message.details || null;
      }
      
      // Extract details if available
      if (errorObj.details) {
        details = errorObj.details;
      }
    } else if (typeof error === 'string') {
      message = error;
    }

    const responseBody: any = {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
    };

    if (details) {
      responseBody.details = details;
    }

    response.status(statusCode).json(responseBody);
  }
}
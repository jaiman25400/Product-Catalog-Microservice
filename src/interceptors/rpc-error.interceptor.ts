import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RpcErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        console.log('Error Occurred: ', error);
        
        // If it's already an RpcException, just rethrow it
        if (error instanceof RpcException) {
          return throwError(() => error);
        }
        
        // If it's an HttpException, convert it to RpcException
        if (error instanceof HttpException) {
          const response = error.getResponse();
          return throwError(() => new RpcException({
            message: response,
            statusCode: error.getStatus(),
          }));
        }
        
        // Handle validation errors from class-validator
        if (error.response && error.status) {
          return throwError(() => new RpcException({
            message: error.response.message || error.message,
            details: error.response.details || null,
            statusCode: error.status,
          }));
        }
        
        // Handle other types of errors
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let details = null;
        
        if (error.response) {
          statusCode = error.response.status || statusCode;
          message = error.response.data?.message || message;
          details = error.response.data?.details || null;
        } else if (error.status) {
          statusCode = error.status;
          message = error.message || message;
        } else if (error.message) {
          message = error.message;
        }
        
        return throwError(() => new RpcException({
          message,
          details,
          statusCode,
        }));
      }),
    );
  }
}
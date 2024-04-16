import { AppLogger } from '@es/core/logger/logger';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// TODO: Add and inject logger
@Injectable()
export class ResponseLogInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(res => {
        this.logger.info('HTTP RESPONSE', {
          res,
        });
      }),
    );
  }
}

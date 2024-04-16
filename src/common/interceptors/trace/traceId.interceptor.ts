import { NESTJS_BOILERPLATE_TRACE_ID } from '@es/common/constants';
import { AppLogger } from '@es/core';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { get } from 'lodash';
import { Observable } from 'rxjs';

@Injectable()
export class TraceIdInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const traceId = get(req, `headers.${NESTJS_BOILERPLATE_TRACE_ID}`);
    if (traceId) {
      this.logger.setTraceId(traceId);
    }
    return next.handle();
  }
}

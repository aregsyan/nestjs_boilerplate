import { UnauthorizedException } from '@es/common';
import { AuthService } from '@es/core';
import {
  CallHandler,
  CanActivate,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { get } from 'lodash';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const authorization = get(req, 'headers.authorization');
    if (!authorization) {
      throw new UnauthorizedException({
        details: {
          'headers.authorization': 'is invalid or missing',
        },
      });
    }

    try {
      this.authService.decodeToken(authorization);
    } catch (err) {
      throw new UnauthorizedException({
        details: {
          'headers.authorization': 'is invalid or missing',
        },
      });
    }

    return next.handle();
  }
}

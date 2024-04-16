import { ForbiddenException } from '@es/common/exceptions/forbidden.exception';
import { UnauthorizedException } from '@es/common/exceptions/unauthorized.exception';
import { AuthService } from '@es/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { get as _get, isEmpty } from 'lodash';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || isEmpty(roles)) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authorization = _get(request, 'headers.authorization');
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

    const rolesFromToken = this.authService.roles;

    const hasRole = () =>
      rolesFromToken.some(role => roles.some(item => item === role));

    if (!hasRole()) {
      throw new ForbiddenException({
        details: {
          'headers.authorization':
            "Insufficient permissions. Your current user roles don't allow you to perform this query. Should you believe this error to be incorrect, please contact an administrator.",
        },
      });
    }

    return true;
  }
}

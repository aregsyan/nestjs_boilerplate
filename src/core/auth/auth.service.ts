import { Injectable, Scope } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { get as _get } from 'lodash';

@Injectable({
  scope: Scope.REQUEST,
})
export class AuthService {
  decodedJwt: {
    role?: string;
    entityId?: string;
    userId?: string;
    email?: string;
    sub?: string;
  } = {};
  _rawToken: string;

  decodeToken(token: string): void {
    this._rawToken = token.replace('Bearer ', '');
    this.decodedJwt = jwt.decode(this._rawToken) as {
      role: string;
      userId: string;
      email: string;
      sub: string;
    };
  }

  get userId(): string {
    return _get(this, 'decodedJwt.sub', null);
  }

  get token() {
    return this._rawToken;
  }

  get roles(): string[] {
    return _get(this, 'decodedJwt.roles', []);
  }
}

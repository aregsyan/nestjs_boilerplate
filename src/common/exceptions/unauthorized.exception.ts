import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from '@es/common';
import { IBaseHttpExceptionOptions } from './base-http.exception';

export class UnauthorizedException extends BaseHttpException {
  constructor(options: IBaseHttpExceptionOptions) {
    super({
      details: options.details,
      message: options.message,
      httpStatusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}

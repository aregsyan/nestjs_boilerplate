import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from '@es/common';
import { IBaseHttpExceptionOptions } from './base-http.exception';

export class ForbiddenException extends BaseHttpException {
  constructor(options: IBaseHttpExceptionOptions) {
    super({
      details: options.details,
      httpStatusCode: HttpStatus.FORBIDDEN,
      message: options.message,
    });
  }
}

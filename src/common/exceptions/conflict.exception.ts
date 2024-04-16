import { HttpStatus } from '@nestjs/common';
import { BaseHttpException, IBaseHttpExceptionOptions } from './base-http.exception';

export class ConflictException extends BaseHttpException {
  constructor(options: IBaseHttpExceptionOptions) {
    super({
      details: options.details,
      message: options.message,
      httpStatusCode: HttpStatus.CONFLICT,
    });
  }
}

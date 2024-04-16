import { HttpStatus } from '@nestjs/common';
import { BaseHttpException, IBaseHttpExceptionOptions } from './base-http.exception';

export class BadRequestException extends BaseHttpException {
  constructor(options: IBaseHttpExceptionOptions) {
    super({
      details: options.details,
      message: options.message,
      httpStatusCode: HttpStatus.BAD_REQUEST,
    });
  }
}

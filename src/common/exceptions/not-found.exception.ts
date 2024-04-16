import { BaseHttpException } from '@es/common';
import { HttpStatus } from '@nestjs/common';
import { IBaseHttpExceptionOptions } from './base-http.exception';

export class NotFoundException extends BaseHttpException {
  constructor(options: IBaseHttpExceptionOptions) {
    super({
      details: options.details,
      message: options.message,
      httpStatusCode: HttpStatus.NOT_FOUND,
    });
  }
}

import { HttpException } from '@nestjs/common';

export interface IBaseHttpExceptionDetails {
  [key: string]: string;
}

export interface IBaseHttpExceptionOptions {
  details?: IBaseHttpExceptionDetails;
  message?: string;
  httpStatusCode?: number;
}

export class BaseHttpException extends HttpException {
  constructor(options: IBaseHttpExceptionOptions) {
    super(
      {
        details: options.details,
        message: options.message,
      },
      options.httpStatusCode,
    );
  }
}

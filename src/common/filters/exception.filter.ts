import { BaseHttpException } from '@es/common';
import { AppLogger } from '@es/core';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { get as getProperty } from 'lodash';
import { ExceptionSerializer } from './serializers/exception.serializer';


@Catch()
export class ExceptionsFilter implements ExceptionFilter<BaseHttpException> {
  constructor(private readonly logger: AppLogger) {}

  catch(exception: BaseHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof BaseHttpException
        ? exception.getStatus()
        : getProperty(
            exception,
            'response.code',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );

    // if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
    Logger.error(exception.stack);
    // }
    const serializedResponse = plainToInstance(ExceptionSerializer, {
      code: status,
      details: getProperty(exception, 'response.details'),
    });

    const res = instanceToPlain(serializedResponse);
    this.logger.info('HTTP ERROR RESPONSE', {
      res,
    });
    response.status(status).json(res);
  }
}

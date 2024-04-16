import { BadRequestException } from '@es/common';
import {
  ArgumentMetadata,
  Injectable,
  ValidationPipe as NestJsValidationPipe,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationError, ValidatorOptions, validate } from 'class-validator';
import { get as getObjectValue, map } from 'lodash';
import { IBaseHttpExceptionDetails } from '../exceptions/base-http.exception';

@Injectable()
export class ValidationPipe extends NestJsValidationPipe {
  useExposedFields = false;
  args: ValidatorOptions;

  constructor(args?) {
    super(args);
    if (args && args.useExposedFields) {
      this.useExposedFields = args.useExposedFields;
    }
    this.args = args;
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.canValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);

    const errors: ValidationError[] = await validate(object, {...this.args});

    if (errors.length > 0) {
      throw new BadRequestException({
        details: this.formatErrorMessages(errors),
      });
    }
    return object;
  }

  private canValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }

  private formatErrorMessages(
    errors: ValidationError[],
    accumulator = {},
    objectPath = '',
  ): IBaseHttpExceptionDetails {
    return errors.reduce((acc, error: ValidationError) => {
      const originalProperty = error.property;

      if (this.useExposedFields) {
        error.property = getObjectValue(
          error.target['exposedFieldsMapping'],
          error.property,
          error.property,
        );
      }

      // make sure that when we have nested case
      // order.address
      // it will remove address from error message
      // error message becomes
      // {
      //     'order.address.some_extra_address': 'must be a string'
      // }
      
      if (objectPath) {
        if (typeof error.target === 'function') {
          error.property = objectPath;
        } else {
          error.property = `${objectPath}.${error.property}`;
        }
      }

      if (error.constraints) {
        acc[error.property] = map(error.constraints, (value: string) => {
          return value.replace(`${originalProperty} `, '');
        }).join(', ');
      }

      if (error.children) {
        return this.formatErrorMessages(error.children, acc, error.property);
      }

      return acc;
    }, accumulator);
  }
}

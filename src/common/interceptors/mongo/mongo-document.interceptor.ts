import { IBaseHttpExceptionDetails } from "@es/common/exceptions/base-http.exception";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from 'class-transformer';
import { ValidationError } from "class-validator";
import { get as getObjectValue, map as lodashMap } from 'lodash';
import { Observable, map } from 'rxjs';

export class MongoDocumentIntercept implements NestInterceptor {
    private readonly useExposedFields;
    private readonly ModelDto;


    constructor(ModelDto, options: {useExposedFields?: boolean} = {useExposedFields: true}) {
        this.useExposedFields = options.useExposedFields;
        this.ModelDto = ModelDto;
    }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(async (data: any) => {
                const instance = plainToInstance(this.ModelDto, data, {
                    excludeExtraneousValues: true,
                }) as any;
                // TODO: removed validation for now
                // const errors = await validate(instance);
                // if(errors.length > 0) {
                //     throw new BadRequestException({
                //         details: this.formatErrorMessages(errors),
                //     });
                // }
                return instance;
            }),
        );
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
                acc[error.property] = lodashMap(error.constraints, (value: string) => {
                    return value.replace(`${originalProperty} `, '');
                }).join(', ');
            }
    
            if (error.children) {
                return this.formatErrorMessages(error.children, acc, error.property);
            }
    
            return acc;
        }, accumulator);
    }
};
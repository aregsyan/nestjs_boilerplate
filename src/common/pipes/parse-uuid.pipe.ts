import { BadRequestException } from "@es/common";
import { UuidType } from "@mikro-orm/core";
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import * as uuid from 'uuid';

@Injectable()
export class ParseUUIdPipe implements PipeTransform<any> {
  transform(value: string, metadata: ArgumentMetadata): UuidType {
    const validUUId = uuid.validate(value);

        if (!validUUId) {
            throw new BadRequestException({
                details: {
                  [`${metadata.type}.${metadata.data}`]: 'should be a valid ObjectId.',
                },
              });
        }
        return value as unknown as UuidType;
  }
}
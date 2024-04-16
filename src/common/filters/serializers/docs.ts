import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import docs from './error-code-map';
import { ExceptionSerializer } from './exception.serializer';

export class InternalErrorDocs extends ExceptionSerializer {
  get message(): string {
    return this._message;
  }
  @ApiHideProperty()
  static readonly description = docs[500].title;

  @ApiPropertyOptional({
    type: 'string',
    example: docs[500].code,
    enum: [docs[500].code],
    default: docs[500].code,
  })
  code: string;

  @ApiProperty({
    type: 'string',
    example: docs[500].message,
    enum: [docs[500].message],
    default: docs[500].message,
  })
  private _message: string;
}

export class BadRequestDocs extends ExceptionSerializer {
  get message(): string {
    return this._message;
  }
  @ApiHideProperty()
  static readonly description = docs[400].title;

  @ApiPropertyOptional({
    type: 'string',
    example: docs[400].code,
    enum: [docs[400].code],
    default: docs[400].code,
  })
  code: string;

  @ApiProperty({
    type: 'string',
    example: docs[400].message,
    enum: [docs[400].message],
    default: docs[400].message,
  })
  private _message: string;
}

export class ForbiddenDocs extends ExceptionSerializer {
  get message(): string {
    return this._message;
  }
  @ApiHideProperty()
  static readonly description = docs[403].title;

  @ApiPropertyOptional({
    type: 'string',
    example: docs[403].code,
    enum: [docs[403].code],
    default: docs[403].code,
  })
  code: string;

  @ApiProperty({
    type: 'string',
    example: docs[403].message,
    enum: [docs[403].message],
    default: docs[403].message,
  })
  private _message: string;
}

export class NotFoundDocs extends ExceptionSerializer {
  get message(): string {
    return this._message;
  }
  @ApiHideProperty()
  static readonly description = docs[404].title;

  @ApiPropertyOptional({
    type: 'string',
    example: docs[404].code,
    enum: [docs[404].code],
    default: docs[404].code,
  })
  code: string;

  @ApiProperty({
    type: 'string',
    example: docs[404].message,
    enum: [docs[404].message],
    default: docs[404].message,
  })
  private _message: string;
}

export class UnauthorizedDocs extends ExceptionSerializer {
  get message(): string {
    return this._message;
  }
  @ApiHideProperty()
  static readonly description = docs[401].title;

  @ApiPropertyOptional({
    type: 'string',
    example: docs[401].code,
    enum: [docs[401].code],
    default: docs[401].code,
  })
  code: string;

  @ApiProperty({
    type: 'string',
    example: docs[401].message,
    enum: [docs[401].message],
    default: docs[401].message,
  })
  private _message: string;
}

export class TooManyRequestsDocs extends ExceptionSerializer {
  get message(): string {
    return this._message;
  }
  @ApiHideProperty()
  static readonly description = docs[429].title;

  @ApiPropertyOptional({
    type: 'string',
    example: docs[429].code,
    enum: [docs[429].code],
    default: docs[429].code,
  })
  code: string;

  @ApiProperty({
    type: 'string',
    example: docs[429].message,
    enum: [docs[429].message],
    default: docs[429].message,
  })
  private _message: string;
}

export class BadGatewayDocs extends ExceptionSerializer {
  get message(): string {
    return this._message;
  }
  @ApiHideProperty()
  static readonly description = docs[502].title;

  @ApiPropertyOptional({
    type: 'string',
    example: docs[502].code,
    enum: [docs[502].code],
    default: docs[502].code,
  })
  code: string;

  @ApiProperty({
    type: 'string',
    example: docs[502].message,
    enum: [docs[502].message],
    default: docs[502].message,
  })
  private _message: string;
}

export class ServiceUnavailableDocs extends ExceptionSerializer {
  get message(): string {
    return this._message;
  }
  @ApiHideProperty()
  static readonly description = docs[503].title;

  @ApiPropertyOptional({
    type: 'string',
    example: docs[503].code,
    enum: [docs[503].code],
    default: docs[503].code,
  })
  code: string;

  @ApiProperty({
    type: 'string',
    example: docs[503].message,
    enum: [docs[503].message],
    default: docs[503].message,
  })
  private _message: string;
}

export class GatewayTimeoutDocs extends ExceptionSerializer {
  get message(): string {
    return this._message;
  }
  @ApiHideProperty()
  static readonly description = docs[504].title;

  @ApiPropertyOptional({
    type: 'string',
    example: docs[504].code,
    enum: [docs[504].code],
    default: docs[504].code,
  })
  code: string;

  @ApiProperty({
    type: 'string',
    example: docs[504].message,
    enum: [docs[504].message],
    default: docs[504].message,
  })
  private _message: string;
}

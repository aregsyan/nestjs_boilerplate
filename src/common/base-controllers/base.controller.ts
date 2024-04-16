import {
  BadRequestDocs,
  ForbiddenDocs,
  InternalErrorDocs,
  JwtInterceptor,
  NotFoundDocs,
  UnauthorizedDocs
} from '@es/common';
import { UseFilters, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ExceptionsFilter } from '../filters/exception.filter';

@ApiBearerAuth('bearer')
@ApiBadRequestResponse({
  description: BadRequestDocs.description,
  type: BadRequestDocs,
})
@ApiForbiddenResponse({
  description: ForbiddenDocs.description,
  type: ForbiddenDocs,
})
@ApiUnauthorizedResponse({
  description: UnauthorizedDocs.description,
  type: UnauthorizedDocs,
})
@ApiNotFoundResponse({
  description: NotFoundDocs.description,
  type: NotFoundDocs,
})
@ApiInternalServerErrorResponse({
  description: InternalErrorDocs.description,
  type: InternalErrorDocs,
})
@ApiTags('Entity Service')
@UseInterceptors(JwtInterceptor)
@UseFilters(ExceptionsFilter)
export class BaseController {}

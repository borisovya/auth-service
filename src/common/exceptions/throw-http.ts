import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

type ExceptionType =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'INTERNAL';

const exceptionMap = {
  BAD_REQUEST: BadRequestException,
  UNAUTHORIZED: UnauthorizedException,
  FORBIDDEN: ForbiddenException,
  NOT_FOUND: NotFoundException,
  CONFLICT: ConflictException,
  INTERNAL: InternalServerErrorException,
};

export function throwHttp(type: ExceptionType, message: string, code?: string | number): never {
  const ExceptionClass = exceptionMap[type] || InternalServerErrorException;
  throw new ExceptionClass({
    statusCode: getStatusCode(type),
    message,
    code: code || type,
  });
}

function getStatusCode(type: ExceptionType): number {
  switch (type) {
    case 'BAD_REQUEST':
      return 400;
    case 'UNAUTHORIZED':
      return 401;
    case 'FORBIDDEN':
      return 403;
    case 'NOT_FOUND':
      return 404;
    case 'CONFLICT':
      return 409;
    case 'INTERNAL':
    default:
      return 500;
  }
}

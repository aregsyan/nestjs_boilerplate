import { HttpStatus } from '@nestjs/common';
import { ForbiddenException } from './forbidden.exception';

describe('Exceptions - ForbiddenException', () => {
  it('should format proper error details', () => {
    let err;
    const details = {
      ['params.id']: 'is invalid or missing',
    };

    try {
      throw new ForbiddenException({
        details,
      });
    } catch (error) {
      err = error.response;
      err.code = error.status;
    } finally {
      expect(err.code).toEqual(HttpStatus.FORBIDDEN);
      expect(err.details).toEqual(details);
      expect(err.message).toBeFalsy();
    }
  });

  it('should override error message', () => {
    let err;
    const details = {
      ['params.id']: 'is invalid or missing',
      ['params.id2']: 'is invalid or missing',
    };

    const message = 'beep';

    try {
      throw new ForbiddenException({
        details,
        message,
      });
    } catch (error) {
      err = error.response;
      err.code = error.status;
    } finally {
      expect(err.code).toEqual(HttpStatus.FORBIDDEN);
      expect(err.details).toEqual(details);
      expect(err.message).toEqual(message);
    }
  });
});

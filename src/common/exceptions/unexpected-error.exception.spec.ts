import { HttpStatus } from '@nestjs/common';
import { UnexpectedErrorException } from './unexpected-error.exception';

describe('Exceptions - UnexpectedErrorException', () => {
  it('should format proper error details', () => {
    let err;
    const details = {
      ['params.id']: 'is invalid or missing',
    };

    try {
      throw new UnexpectedErrorException({
        details,
      });
    } catch (error) {
      err = error.response;
      err.code = error.status;
    } finally {
      expect(err.code).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new UnexpectedErrorException({
        details,
        message,
      });
    } catch (error) {
      err = error.response;
      err.code = error.status;
    } finally {
      expect(err.code).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(err.details).toEqual(details);
      expect(err.message).toEqual(message);
    }
  });
});

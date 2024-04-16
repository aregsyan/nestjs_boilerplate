import { HttpStatus } from '@nestjs/common';
import { ConflictException } from './conflict.exception';

describe('Exceptions - ConflictException', () => {
  it('should format proper error details', () => {
    let err;
    const details = {
      ['params.id']: 'already exists',
      ['params.id2']: 'already exists',
    };

    try {
      throw new ConflictException({
        details,
      });
    } catch (error) {
      err = error.response;
      err.code = error.status;
    } finally {
      expect(err.code).toEqual(HttpStatus.CONFLICT);
      expect(err.details).toEqual(details);
      expect(err.message).toBeFalsy();
    }
  });

  it('should override error message', () => {
    let err;
    const details = {
      ['params.id']: 'already exists',
      ['params.id2']: 'already exists',
    };

    const message = 'beep';

    try {
      throw new ConflictException({
        details,
        message,
      });
    } catch (error) {
      err = error.response;
      err.code = error.status;
    } finally {
      expect(err.code).toEqual(HttpStatus.CONFLICT);
      expect(err.details).toEqual(details);
      expect(err.message).toEqual(message);
    }
  });
});

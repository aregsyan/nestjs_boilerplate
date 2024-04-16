import { HttpStatus } from '@nestjs/common';
import { NotFoundException } from './not-found.exception';

describe('Exceptions - NotFoundException', () => {
  it('should format proper error details', () => {
    let err;
    const details = {
      ['params.id']: 'is invalid or missing',
    };

    try {
      throw new NotFoundException({
        details,
      });
    } catch (error) {
      err = error.response;
      err.code = error.status;
    } finally {
      expect(err.code).toEqual(HttpStatus.NOT_FOUND);
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
      throw new NotFoundException({
        details,
        message,
      });
    } catch (error) {
      err = error.response;
      err.code = error.status;
    } finally {
      expect(err.code).toEqual(HttpStatus.NOT_FOUND);
      expect(err.details).toEqual(details);
      expect(err.message).toEqual(message);
    }
  });
});

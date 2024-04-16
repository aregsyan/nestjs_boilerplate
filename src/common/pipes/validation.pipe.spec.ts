import { HttpStatus } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ValidationPipe } from './validation.pipe';

class BeepBeep {
  @IsBoolean()
  beep: boolean;
}

describe('Pipes - ValidationPipe', () => {
  const pipe = new ValidationPipe();

  it('should pass if there is no metatype', async () => {
    // @ts-ignore
    const result = await pipe.transform('beep', {});

    expect(result).toEqual('beep');
  });

  it('should pass if metatype is not either of [String, Boolean, Number, Array, Object]', async () => {
    const result = await pipe.transform(
      'beep',
      // @ts-ignore
      {
        // @ts-ignore
        metatype: null,
      },
    );

    expect(result).toEqual('beep');
  });

  it('should pass validation', async () => {
    const result = await pipe.transform(
      'beep',
      // @ts-ignore
      {
        // @ts-ignore
        metatype: '',
      },
    );

    expect(result).toEqual('beep');
  });

  it('should fail if value type does not match metatype', async () => {
    let err;

    const beepBeep = new BeepBeep();
    // @ts-ignore
    beepBeep.beep = 'beep';

    try {
      await pipe.transform(
        beepBeep,
        // @ts-ignore
        {
          // @ts-ignore
          metatype: BeepBeep,
        },
      );
    } catch (error) {
      err = error.response;
      err.code = error.status;
    } finally {
      expect(err.code).toEqual(HttpStatus.BAD_REQUEST);
      expect(err.details.beep).toBeDefined();
    }
  });

  it('should fail if nested object validation fails', async () => {
    let err;

    class Boop {
      @IsString()
      x;

      @IsArray()
      arr;
    }

    class BeepBeepBeep extends BeepBeep {
      @ValidateNested()
      @Type(() => Boop)
      boop: Boop;
    }

    const beepBeep = new BeepBeepBeep();
    // @ts-ignore
    beepBeep.beep = 'beep';

    const boop = new Boop();
    boop.x = 1234;
    boop.arr = 4567;

    beepBeep.boop = boop;

    try {
      await pipe.transform(
        beepBeep,
        // @ts-ignore
        {
          // @ts-ignore
          metatype: BeepBeepBeep,
        },
      );
    } catch (error) {
      err = error.response;
      err.code = error.status;
    } finally {
      expect(err.code).toEqual(HttpStatus.BAD_REQUEST);
      expect(err.details.beep).toBeDefined();
      expect(err.details['boop.x']).toBeDefined();
      expect(err.details['boop.arr']).toBeDefined();
    }
  });

  describe('snake_case', () => {
    class NestedNestedBeepBeep {
      exposedFieldsMapping = {
        numberNumberNumber: 'number_number_number',
        stringStringString: 'string_string_string',
      };
      @IsNumber()
      numberNumberNumber;

      @IsString()
      stringStringString;
    }
    class NestedBeepBeep {
      exposedFieldsMapping = {
        numberNumberNumber: 'number_number_number',
        stringStringString: 'string_string_string',
        boopBoop: 'boop_boop',
      };
      @IsNumber()
      numberNumberNumber;

      @IsString()
      stringStringString;

      @ValidateNested()
      @Type(() => NestedNestedBeepBeep)
      boopBoop;
    }

    class SnakeCase {
      exposedFieldsMapping = {
        nestedBeepBeep: 'nested_beep_beep',
        beepBeep: 'beep_beep',
      };

      @IsString()
      beep;

      @IsBoolean()
      beepBeep;

      @ValidateNested()
      @Type(() => NestedBeepBeep)
      nestedBeepBeep;
    }

    it('should transform error message into snake_case', async () => {
      const snakePipe = new ValidationPipe({
        useExposedFields: true,
      });

      const model = new SnakeCase();
      model.beep = 123;
      model.beepBeep = 123;
      model.nestedBeepBeep = {
        numberNumberNumber: '123',
        stringStringString: 123,
        boopBoop: {
          numberNumberNumber: '123',
          stringStringString: 123,
        },
      };

      let err;
      try {
        await snakePipe.transform(
          model,
          // @ts-ignore
          {
            // @ts-ignore
            metatype: SnakeCase,
          },
        );
      } catch (error) {
        err = error.response;
        err.code = error.status;
      } finally {
        expect(err.code).toEqual(HttpStatus.BAD_REQUEST);

        expect(err.details.beep).toBeDefined();
        expect(err.details['beep']).toBeDefined();
        expect(err.details['beep_beep']).toBeDefined();

        expect(
          err.details['nested_beep_beep.number_number_number'],
        ).toBeDefined();
        expect(
          err.details['nested_beep_beep.string_string_string'],
        ).toBeDefined();
        expect(
          err.details['nested_beep_beep.boop_boop.number_number_number'],
        ).toBeDefined();
        expect(
          err.details['nested_beep_beep.boop_boop.string_string_string'],
        ).toBeDefined();
      }
    });
  });
});

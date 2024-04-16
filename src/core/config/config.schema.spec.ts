import LOG_LEVEL from '@es/core/logger/enum/LogLevel';
import { cloneDeep } from 'lodash';
import { schema } from './config.schema';

describe('Config Schema', () => {
  let processEnv;

  beforeEach(() => {
    processEnv = cloneDeep(process.env);
    process.env = {
      NODE_ENV: 'test',
      DATABASE_URI: 'mongodb://mongo:27017/trx',
      LOG_LEVEL: 'info',
    };
  });

  afterEach(() => {
    process.env = processEnv;
  });

  describe('NODE_ENV', () => {
    it('should use default if value is not defined', () => {
      expect(schema.validate(process.env).value['NODE_ENV']).toEqual('test');
    });

    it('should set value if defined', () => {
      delete process.env.NODE_ENV;
      expect(schema.validate(process.env).value['NODE_ENV']).toEqual('development');
    });
  });

  describe('PORT', () => {
    it('should use default if value is not defined', () => {
      // @ts-ignore
      process.env.PORT = 3210;
      expect(schema.validate(process.env).value['PORT']).toEqual(3210);
    });

    it('should set value if defined', () => {
      delete process.env.PORT;
      expect(schema.validate(process.env).value['PORT']).toEqual(8080);
    });
  });

  describe('Log', () => {
    describe('LOG_LEVEL', () => {
      it('should throw if value is invalid', () => {
        process.env.LOG_LEVEL = 'invalid-value';
        expect(schema.validate(process.env).value['LOG_LEVEL']).toEqual(
          'invalid-value',
        );
      });

      it('Debug: should set value if defined', () => {
        process.env.LOG_LEVEL = LOG_LEVEL.Debug;
        expect(schema.validate(process.env).value['LOG_LEVEL']).toEqual(
          'debug',
        );
      });

      it('Info: should set value if defined', () => {
        process.env.LOG_LEVEL = LOG_LEVEL.Info;
        expect(schema.validate(process.env).value['LOG_LEVEL']).toEqual('info');
      });

      it('Warn: should set value if defined', () => {
        process.env.LOG_LEVEL = LOG_LEVEL.Warn;
        expect(schema.validate(process.env).value['LOG_LEVEL']).toEqual('warn');
      });

      it('Trace: should set value if defined', () => {
        process.env.LOG_LEVEL = LOG_LEVEL.Trace;
        expect(schema.validate(process.env).value['LOG_LEVEL']).toEqual(
          'trace',
        );
      });

      it('Error: should set value if defined', () => {
        process.env.LOG_LEVEL = LOG_LEVEL.Error;
        expect(schema.validate(process.env).value['LOG_LEVEL']).toEqual(
          'error',
        );
      });
    });
  });
});

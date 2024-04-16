import { NESTJS_BOILERPLATE_TRACE_ID } from '@es/common';
import { AppLogger, ConfigModule } from '@es/core';
import { LOGGER_INSTANCE } from '@es/core/logger/types';
import { Test, TestingModule } from '@nestjs/testing';

const logger = {
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  trace: jest.fn(),
};
describe('logger', () => {
  let service: AppLogger;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: LOGGER_INSTANCE,
          useValue: logger,
        },
        AppLogger,
      ],
      imports: [ConfigModule],
    }).compile();
    service = await module.resolve<AppLogger>(AppLogger);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('setMetadata()', () => {
    it('should call the method and set', () => {
      service.setMetadata({ test: 'ok' });
    });
  });

  describe('setTraceId()', () => {
    it('should set traceId and call setMetadata method', () => {
      jest.spyOn(service, 'setMetadata');
      service.setTraceId('test-id');
      expect(service.traceId).toEqual('test-id');
      expect(service.setMetadata).toHaveBeenCalledWith({
        [NESTJS_BOILERPLATE_TRACE_ID]: 'test-id',
      });
    });
  });
  describe('setContext()', () => {
    it('should be called', function() {
      service.setContext('context');
    });
  });
  describe('error()', () => {
    it('should call bunyanLog.error method', () => {
      const error = new Error('test');
      const metadata = { data: 'error' };
      service.error('error-test-message', error, metadata);
      expect(logger.error).toHaveBeenCalledTimes(1);
    });
  });

  describe('warn()', () => {
    it('should call bunyanLog.warn method', () => {
      const metadata = { data: 'error' };
      service.warn('warn-test-message', metadata);
      expect(logger.warn).toHaveBeenCalledTimes(1);
    });
  });

  describe('info()', () => {
    it('should call bunyanLog.info method', () => {
      const metadata = { data: 'error' };
      service.info('info-test-message', metadata);
      expect(logger.info).toHaveBeenCalledTimes(1);
    });
  });

  describe('debug()', () => {
    it('should call bunyanLog.debug method', () => {
      const metadata = { data: 'error' };
      service.debug('debug-test-message', metadata);
      expect(logger.debug).toHaveBeenCalledTimes(1);
    });
  });

  describe('trace()', () => {
    it('should call bunyanLog.trace method', () => {
      const metadata = { data: 'error' };
      service.trace('trace-test-message', metadata);
      expect(logger.trace).toHaveBeenCalledTimes(1);
    });
  });
});

import { NESTJS_BOILERPLATE_TRACE_ID } from '@es/common/constants';
import { AppLogger } from '@es/core';
import { Test, TestingModule } from '@nestjs/testing';
import { TraceIdInterceptor } from './traceId.interceptor';

const appLogger = {
  setTraceId: jest.fn(),
  traceId: 'some-trace-id',
};

const executionContext = {
  switchToHttp: jest.fn().mockReturnThis(),
  getRequest: jest.fn().mockReturnThis(),
};

const callHandler = {
  handle: jest.fn(),
};

const requestTraceId = 'some-trace-id';

describe('TraceIdInterceptor', () => {
  let interceptor: TraceIdInterceptor;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TraceIdInterceptor],
      providers: [
        {
          provide: AppLogger,
          useValue: appLogger,
        },
      ],
    }).compile();

    interceptor = module.get<TraceIdInterceptor>(TraceIdInterceptor);
    callHandler.handle.mockReset();
  });
  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('intercept incoming http request and save the traceId', async () => {
    (executionContext.switchToHttp().getRequest as jest.Mock<
      any,
      any
    >).mockReturnValueOnce({
      headers: {
        [NESTJS_BOILERPLATE_TRACE_ID]: requestTraceId,
      },
    });
    callHandler.handle.mockResolvedValueOnce('next handle');
    const actualValue = await interceptor.intercept(
      // @ts-ignore
      executionContext,
      callHandler,
    );
    expect(actualValue).toBe('next handle');
    expect(appLogger.traceId).toEqual(requestTraceId);
    expect(callHandler.handle).toHaveBeenCalledTimes(1);
  });

  it('intercept incoming http request if there is no traceId header', async () => {
    (executionContext.switchToHttp().getRequest as jest.Mock<
      any,
      any
    >).mockReturnValueOnce({
      body: {
        beep: 'beep',
      },
    });
    callHandler.handle.mockResolvedValueOnce('next handle');
    const actualValue = await interceptor.intercept(
      // @ts-ignore
      executionContext,
      callHandler,
    );
    expect(actualValue).toBe('next handle');
    expect(callHandler.handle).toHaveBeenCalledTimes(1);
  });
});

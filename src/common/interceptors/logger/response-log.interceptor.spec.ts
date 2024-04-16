import { AppLogger, ConfigService } from '@es/core';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { ResponseLogInterceptor } from './response-log.interceptor';

const executionContext = {
  switchToHttp: jest.fn().mockReturnThis(),
  getRequest: jest.fn().mockReturnThis(),
};

const callHandler = {
  handle: jest.fn(),
};

const mockLogger = {
  info: jest.fn().mockReturnValue(''),
  setContext: jest.fn().mockReturnValue(''),
};

describe('ResponseLogInterceptor', () => {
  let logger: AppLogger;
  let interceptor: ResponseLogInterceptor;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResponseLogInterceptor,
        {
          provide: ConfigService,
          useValue: {
            orders: {
              url: '',
            },
          },
        },
        {
          provide: AppLogger,
          useValue: mockLogger,
        },
      ],
    }).compile();

    interceptor = module.get<ResponseLogInterceptor>(ResponseLogInterceptor);
  });
  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
  it('intercept incoming http request', async () => {
    (executionContext.switchToHttp().getRequest as jest.Mock<
      any,
      any
    >).mockReturnValueOnce({
      headers: {
        authorization: 'token',
      },
      body: {
        orderId: '347682686643',
      },
    });
    callHandler.handle.mockImplementationOnce(() => {
      return of('next handle');
    });
    const actualValue = await new Promise(resolve => {
      interceptor
        .intercept(
          // @ts-ignore
          executionContext,
          callHandler,
        )
        .subscribe(val => {
          resolve(val);
        });
    });
    expect(actualValue).toBe('next handle');
    expect(callHandler.handle).toHaveBeenCalledTimes(1);
  });
});

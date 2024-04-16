import { HttpStatus, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppLogger } from '../../core';
import { ExceptionsFilter } from './exception.filter';

const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson,
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus,
}));
const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
}));

const appLogger = {
  setTraceId: jest.fn(),
  info: jest.fn(),
  setContext: jest.fn(),
};

const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};

describe('ExceptionsFilter', () => {
  let app: TestingModule;
  let service: ExceptionsFilter;

  beforeEach(async () => {
    jest.spyOn(Logger, 'error').mockReturnValue();

    app = await Test.createTestingModule({
      providers: [
        ExceptionsFilter,
        {
          provide: AppLogger,
          useValue: appLogger,
        },
      ],
    }).compile();

    service = app.get<ExceptionsFilter>(ExceptionsFilter);

    mockHttpArgumentsHost.mockClear();
    mockGetResponse.mockClear();
    mockStatus.mockClear();
    mockJson.mockClear();
  });

  it('should format outgoing response when unknown exception is thrown', async () => {
    // @ts-ignore
    service.catch(new Error('Avadra kedavra'), mockArgumentsHost);
    expect(mockHttpArgumentsHost).toHaveBeenCalledTimes(1);
    expect(mockHttpArgumentsHost).toHaveBeenCalledWith();
    expect(mockGetResponse).toHaveBeenCalledTimes(1);
    expect(mockGetResponse).toHaveBeenCalledWith();
    expect(mockStatus).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockJson).toHaveBeenCalledTimes(1);
    const [[result]] = mockJson.mock.calls;
    expect(result).toHaveProperty('code');
    expect(result).toHaveProperty('details');
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('timestamp');
  });

  it('should catch route not found error', async () => {
    service.catch(
      // @ts-ignore
      {
        response: {
          code: 404,
        },
      },
      mockArgumentsHost,
    );
    expect(mockHttpArgumentsHost).toHaveBeenCalledTimes(1);
    expect(mockHttpArgumentsHost).toHaveBeenCalledWith();
    expect(mockGetResponse).toHaveBeenCalledTimes(1);
    expect(mockGetResponse).toHaveBeenCalledWith();
    expect(mockStatus).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockJson).toHaveBeenCalledTimes(1);
    const [[result]] = mockJson.mock.calls;
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('timestamp');
  });
});

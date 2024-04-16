import { UnauthorizedException } from '@es/common/exceptions/unauthorized.exception';
import { AuthService } from '@es/core';
import { JwtInterceptor } from './jwt.interceptor';

const authService = new AuthService();
const interceptor = new JwtInterceptor(authService);

const executionContext = {
  switchToHttp: jest.fn().mockReturnThis(),
  getRequest: jest.fn().mockReturnThis(),
};

const callHandler = {
  handle: jest.fn(),
};

const VALID_TOKEN =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MTMyNzg4NjUsImV4cCI6MTc0NDgxNDg2NSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoianJvY2tldEBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJJZCI6IjEwYzI0ZDQ2LWE4OGQtNDQyMC04YWEyLThlNDVmOWVlMjE2NiJ9.eQZsSQ1uiTo1-QMCyEM4HE7EVO9E6NDL_1C2QrssGuE';

const INVALID_TOKEN = 'Bearer gwweed';

describe('JwtInterceptor', () => {
  beforeEach(() => {
    authService._rawToken = undefined;
    callHandler.handle.mockReset();
  });
  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
  it('intercept incoming http request and save the jwt token', async () => {
    (executionContext.switchToHttp().getRequest as jest.Mock<
      any,
      any
    >).mockReturnValueOnce({
      headers: {
        authorization: VALID_TOKEN,
      },
    });
    callHandler.handle.mockResolvedValueOnce('next handle');
    const actualValue = await interceptor.intercept(
      // @ts-ignore
      executionContext,
      callHandler,
    );
    expect(actualValue).toBe('next handle');
    expect(authService.token).toEqual(VALID_TOKEN.replace('Bearer ', ''));
    expect(callHandler.handle).toBeCalledTimes(1);
  });

  it('intercept incoming http request and throw error if there is no/Invalid JWT', async () => {
    (executionContext.switchToHttp().getRequest as jest.Mock<
      any,
      any
    >).mockReturnValueOnce({
      headers: {},
    });
    callHandler.handle.mockResolvedValueOnce(null);
    expect(() =>
      interceptor.intercept(
        // @ts-ignore
        executionContext,
        callHandler,
      ),
    ).toThrow(UnauthorizedException);
  });

  it('intercept incoming http request and throw error if there is not possible to decode JWT token', async () => {
    (executionContext.switchToHttp().getRequest as jest.Mock<
      any,
      any
    >).mockReturnValueOnce({
      headers: {
        authorization: INVALID_TOKEN,
      },
    });
    jest.spyOn(authService, 'decodeToken').mockImplementationOnce(() => {
      throw new Error('test');
    });
    callHandler.handle.mockResolvedValueOnce(null);
    expect(() =>
      interceptor.intercept(
        // @ts-ignore
        executionContext,
        callHandler,
      ),
    ).toThrow(UnauthorizedException);
  });
});

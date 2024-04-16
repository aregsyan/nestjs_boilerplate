import {
  ForbiddenException,
  UnauthorizedException,
  UserRoles,
} from '@es/common';
import { AuthService } from '@es/core';
import { RolesGuard } from './roles.guard';

const authService = new AuthService();
const executionContext = {
  switchToHttp: jest.fn().mockReturnThis(),
  getRequest: jest.fn().mockReturnThis(),
  getHandler: jest.fn().mockReturnThis(),
};
const reflector = {
  get: jest.fn().mockReturnThis(),
  getAll: jest.fn().mockReturnThis(),
  getAllAndMerge: jest.fn().mockReturnThis(),
  getAllAndOverride: jest.fn().mockReturnThis(),
};
const rolesGuard = new RolesGuard(reflector, authService);

const VALID_TOKEN =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MTMyNzg4NjUsImV4cCI6MTc0NDgxNDg2NSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoianJvY2tldEBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJJZCI6IjEwYzI0ZDQ2LWE4OGQtNDQyMC04YWEyLThlNDVmOWVlMjE2NiJ9.eQZsSQ1uiTo1-QMCyEM4HE7EVO9E6NDL_1C2QrssGuE';
const INVALID_TOKEN = 'Bearer eyJ0eXAiO';
describe('RolesGuard', () => {
  it('returns true if roles is not defined', () => {
    (reflector.get as jest.Mock<any, any>).mockReturnValueOnce(null);
    expect(
      rolesGuard.canActivate(
        // @ts-ignore
        executionContext,
      ),
    ).toEqual(true);
  });

  it('returns true if roles is empty', () => {
    (reflector.get as jest.Mock<any, any>).mockReturnValueOnce([]);
    expect(
      rolesGuard.canActivate(
        // @ts-ignore
        executionContext,
      ),
    ).toEqual(true);
  });

  it('should throw forbidden exception if header doesnt contain authorization', () => {
    (reflector.get as jest.Mock<any, any>).mockReturnValueOnce([
      UserRoles.Admin,
    ]);
    (executionContext.switchToHttp().getRequest as jest.Mock<
      any,
      any
    >).mockReturnValueOnce(null);
    expect(() => {
      rolesGuard.canActivate(
        // @ts-ignore
        executionContext,
      );
    }).toThrow(UnauthorizedException);
  });

  it('should throw Unauthorized exception if decode token not successfully done', () => {
    (reflector.get as jest.Mock<any, any>).mockReturnValueOnce([
      UserRoles.Admin,
    ]);
    (executionContext.switchToHttp().getRequest as jest.Mock<
      any,
      any
    >).mockReturnValueOnce({
      headers: {
        authorization: INVALID_TOKEN,
      },
    });
    jest.spyOn(authService, 'decodeToken').mockImplementationOnce(() => {
      throw new Error('error');
    });
    expect(() => {
      rolesGuard.canActivate(
        // @ts-ignore
        executionContext,
      );
    }).toThrow(UnauthorizedException);
  });

  it('should throw forbidden exception if role is forbidden', () => {
    (reflector.get as jest.Mock<any, any>).mockReturnValueOnce(['ADMIN']);
    (executionContext.switchToHttp().getRequest as jest.Mock<
      any,
      any
    >).mockReturnValueOnce({
      headers: {
        authorization: VALID_TOKEN,
      },
    });
    expect(() => {
      rolesGuard.canActivate(
        // @ts-ignore
        executionContext,
      );
    }).toThrow(ForbiddenException);
  });

  it('should return true if role is allowed', () => {
    (reflector.get as jest.Mock<any, any>).mockReturnValueOnce([
      UserRoles.Admin,
    ]);
    (executionContext.switchToHttp().getRequest as jest.Mock<
      any,
      any
    >).mockReturnValueOnce({
      headers: {
        authorization: VALID_TOKEN,
      },
    });
    expect(
      rolesGuard.canActivate(
        // @ts-ignore
        executionContext,
      ),
    ).toEqual(true);
  });
});

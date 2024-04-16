import { Scope } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

const VALID_TOKEN =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MTMyNzg4NjUsImV4cCI6MTc0NDgxNDg2NSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoianJvY2tldEBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJJZCI6IjEwYzI0ZDQ2LWE4OGQtNDQyMC04YWEyLThlNDVmOWVlMjE2NiJ9.eQZsSQ1uiTo1-QMCyEM4HE7EVO9E6NDL_1C2QrssGuE';

const INVALID_TOKEN = 'beepbeepbbep';
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useClass: AuthService,
          scope: Scope.DEFAULT,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should decode token', () => {
    service.decodeToken(VALID_TOKEN);

    expect(service.decodedJwt).toHaveProperty('role');
    expect(service.decodedJwt).toHaveProperty('sub');
    expect(service.decodedJwt).toHaveProperty('userId');
    expect(service.decodedJwt).toHaveProperty('email');
  });

  it('should decode invalid token', () => {
    service.decodeToken(INVALID_TOKEN);
    expect(service.decodedJwt).toBeNull();
    expect(service.decodedJwt).toBeNull();
  });

  it('should return userId', () => {
    service.decodeToken(VALID_TOKEN);

    expect(service.userId).toBeTruthy();
  });

  it('should return roles', () => {
    service.decodeToken(VALID_TOKEN);

    expect(service.roles).toBeTruthy();
  });

  it('should return empty array if roles are invalid', () => {
    service.decodeToken(INVALID_TOKEN);

    expect(service.roles).toEqual([]);
  });

  it('should return raw token', () => {
    service.decodeToken(VALID_TOKEN);

    expect(service.token).toEqual(VALID_TOKEN.replace('Bearer ', ''));
  });
});

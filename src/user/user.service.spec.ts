import { AppLogger } from '@es/core';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { getRepositoryToken } from '@mikro-orm/nestjs';


// TODO: Move to global mock
const appLogger = {
  setTraceId: jest.fn(),
  info: jest.fn(),
  setContext: jest.fn(),
};



const fixture = {
  id: '5f5f5f5f5f5f5f5f5f5f5f5f',
  firstName: 'Test User',
  createdAt: new Date(),
  updatedAt: new Date(),
}


// TODO: Move to global mock
class MockUserModel {
  constructor(private _: any) {}
  new = jest.fn().mockResolvedValue({});
  static save = jest.fn().mockResolvedValue(fixture);
  static find = jest.fn().mockReturnThis();
  static create = jest.fn().mockReturnValue(fixture);
  static findOneAndDelete = jest.fn().mockImplementation((id: string) => {});
  static exec = jest.fn().mockReturnValue(fixture);
  static select = jest.fn().mockReturnThis();
  static findOne = jest.fn().mockImplementation((id: string) => {});
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService, 
        {
          provide: getRepositoryToken(User.name),
          useValue: MockUserModel,
        },
        {
          provide: AppLogger,
          useValue: appLogger,
        },
    ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

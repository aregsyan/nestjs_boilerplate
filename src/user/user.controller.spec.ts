import { AppLogger, AuthService } from '@es/core';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './models/user.model';
import {getRepositoryToken } from '@mikro-orm/nestjs';

// TODO: Move to global mock
const appLogger = {
  setTraceId: jest.fn(),
  info: jest.fn(),
  setContext: jest.fn(),
};

// TODO: Move to global mock
const authService = {
  decodeToken: jest.fn(),
  userId: jest.fn(),
  roles: jest.fn(),
}


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

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
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
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

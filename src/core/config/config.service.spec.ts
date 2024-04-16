import { Test, TestingModule } from '@nestjs/testing';
import { cloneDeep } from 'lodash';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  let processEnv;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    processEnv = cloneDeep(process.env);

    service = module.get<ConfigService>(ConfigService);
  });

  afterAll(() => {
    process.env = processEnv;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return Log configuration from process.env', () => {
    process.env.LOG_NAME = 'nestjs-boilerplate';
    process.env.LOG_LEVEL = 'info';
    expect(service.log).toEqual({
      name: 'nestjs-boilerplate',
      level: 'info',
    });
  });
});

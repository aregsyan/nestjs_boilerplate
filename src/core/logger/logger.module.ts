import { ConfigModule, ConfigService } from '@es/core';
import { Global, Module } from '@nestjs/common';
import * as bunyan from 'bunyan';
import { AppLogger } from './logger';
import { LOGGER_INSTANCE } from './types';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: LOGGER_INSTANCE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { log } = configService;
        const logName = log.name;
        const logLevel = log.level;

        const bunyanLog: bunyan = bunyan.createLogger({
          level: logLevel,
          name: logName,
          streams: [{stream: process.stdout}],
        });
        return bunyanLog;
      },
    },
    AppLogger,
  ],
  exports: [AppLogger],
})
export class LoggerModule {}

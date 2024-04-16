import LOG_LEVEL from '@es/core/logger/enum/LogLevel';
import { Injectable } from '@nestjs/common';
import { ConfigService as NestJSConfigService } from '@nestjs/config';
import NodeEnv from './enum/NodeEnv';

@Injectable()
export class ConfigService extends NestJSConfigService {

  get app(): {
    nodeEnv: NodeEnv;
    port: number;
  } {
    return {
      nodeEnv: this.get('NODE_ENV'),
      port: this.get('PORT'),
    };
  }

  get database(): {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  } {
    return {
      host: this.get('DATABASE_HOST'),
      port: this.get('DATABASE_PORT'),
      user: this.get('DATABASE_USER'),
      password: this.get('DATABASE_PASSWORD'),
      name: this.get('DATABASE_NAME'),
    };
  }

  get log(): {
    name: string;
    level: LOG_LEVEL;
  } {
    return {
      name: this.get('LOG_NAME'),
      level: this.get('LOG_LEVEL'),
    };
  }

  get sentry(): {
    dsn: string;
  } {
    return {
      dsn: this.get('SENTRY_DSN'),
    };
  }
}

import LogLevel from '@es/core/logger/enum/LogLevel';
import * as Joi from 'joi';
import { SERVICE_NAME } from './constants';
import NodeEnv from './enum/NodeEnv';

export const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(NodeEnv.Local, NodeEnv.Development, NodeEnv.Test, NodeEnv.Production)
    .default(NodeEnv.Development),
  PORT: Joi.number().default(8080),

  // Database
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),

  //Logs
  LOG_NAME: Joi.string()
    .description('name of the log')
    .default(SERVICE_NAME),
  LOG_LEVEL: Joi.string()
    .valid(
      LogLevel.Debug,
      LogLevel.Error,
      LogLevel.Info,
      LogLevel.Trace,
      LogLevel.Warn,
    )
    .default('debug'),

  SENTRY_DSN: Joi.string().optional(),
});

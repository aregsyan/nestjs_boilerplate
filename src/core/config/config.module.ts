import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestJSConfigModule } from '@nestjs/config';
import { schema } from './config.schema';
import { ConfigService } from './config.service';

/* istanbul ignore file */
@Global()
@Module({})
export class ConfigModule extends NestJSConfigModule {
  static async forRootAsync() {
    return {
      module: ConfigModule,
      global: true,
      imports: [
        NestJSConfigModule.forRoot({
          ...(process.env.LOAD_CONFIG_FROM_FILE && {envFilePath: process.env.NODE_ENV ? `env_files/.env.${process.env.NODE_ENV}` : '.env'} || {}),
          isGlobal: true,
          validationSchema: schema,
          validationOptions: {
            allowUnknown: true,
            abortEarly: false,
          },
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}

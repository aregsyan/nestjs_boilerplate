import {
  AppLogger,
  AuthModule,
  ConfigModule,
  LoggerModule,
} from '@es/core';
import { HttpModule } from '@nestjs/axios';
import { FactoryProvider, Module, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { TraceIdInterceptor } from './common/interceptors/trace/traceId.interceptor';
import { DatabaseModule } from './database/database.module';
import { HealthCheckModule } from './healthcheck/healthcheck.module';


const rlog: FactoryProvider = {
  provide: APP_INTERCEPTOR,
  scope: Scope.REQUEST,
  inject: [AppLogger],
  useFactory: (logger: AppLogger) => {
    return new TraceIdInterceptor(logger);
  },
};

@Module({
  imports: [
    ConfigModule.forRootAsync(),
    LoggerModule,
    DatabaseModule,
    HttpModule,
    HealthCheckModule,
    AuthModule,
    UserModule,
  ],
  providers: [rlog],
})
export class AppModule {}

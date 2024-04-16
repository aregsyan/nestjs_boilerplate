import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthCheckController } from './healthcheck.controller';
import { HealthChecker } from './healthcheck.service';

@Module({
  providers: [
    HealthChecker,
  ],
  imports: [TerminusModule],
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}

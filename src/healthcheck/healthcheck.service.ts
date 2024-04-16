import { Injectable } from '@nestjs/common';
import {
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
} from '@nestjs/terminus';

@Injectable()
export class HealthChecker {
  constructor(
    private readonly healthCheck: HealthCheckService,
  ) {}

  async check(): Promise<HealthCheckResult> {
    return this.healthCheck.check([
      async (): Promise<HealthIndicatorResult> => {
        return { 'my-app': { status: 'up' } };
      },
    ]);
  }
}

import { ExceptionsFilter } from '@es/common/filters/exception.filter';
import { ResponseLogInterceptor } from '@es/common/interceptors/logger/response-log.interceptor';
import { Controller, Get, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { healthTags } from './constants';
import { HealthChecker } from './healthcheck.service';

@ApiTags(...healthTags)
@Controller('/healthcheck')
@UseFilters(ExceptionsFilter)
export class HealthCheckController {
  constructor(private healthCheck: HealthChecker) {}
  
  @Get()
  @ApiOperation({ summary: 'Health check if the api is up and running' })
  @ApiResponse({
    status: 200,
    description: 'Returns 200 if server is up and running.',
  })
  @HealthCheck()
  @UseInterceptors(ResponseLogInterceptor)
  check(): Promise<HealthCheckResult> {
    return this.healthCheck.check();
  }
}

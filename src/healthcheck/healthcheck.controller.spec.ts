import { HealthCheckController } from './healthcheck.controller';

describe('HealthCheckController Tests', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return status: ok', async () => {
    const health = await controller.check();
    expect(health.status).toBe('ok');
  });
});

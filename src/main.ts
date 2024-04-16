import { ConfigService } from '@es/core';
import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApiDoc } from './common/docs/doc';

async function bootstrap() {
  const context = 'Entity-service Bootstrap';
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.app.port;
  app.setGlobalPrefix('/api');
  await setupApiDoc(app);
  await app.listen(port);
  Logger.log(`Application is running on port: ${port}`, context);
  bindProcessCloseSignals(app);
}

const processCloseHandler = async (app): Promise<void> => {
  try {
    // TODO: Add graceful shutdown
    // await app.stop.apply(app);
    Logger.debug(`Application is stopped.`);
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  } catch (e) {
    Logger.error(`Error while stopping application: ${e}`);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};

const bindProcessCloseSignals = (app): void => {
  process.on('exit', processCloseHandler.bind(null, app));
  process.on('SIGINT', processCloseHandler.bind(null, app));
  process.on('SIGTERM', processCloseHandler.bind(null, app));
  process.on('SIGUSR1', processCloseHandler.bind(null, app));
  process.on('SIGUSR2', processCloseHandler.bind(null, app));
  process.on('uncaughtException', processCloseHandler.bind(null, app));
};

bootstrap();

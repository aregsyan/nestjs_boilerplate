import { HealthCheckModule } from '@es/healthcheck/healthcheck.module';
import { UserModule } from '@es/user/user.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import redoc from 'redoc-express';
import { Ioption } from 'redoc-express/dist/redoc-html-template';
import { BASE_PATH, apiDescription, apiTitle } from './constants';

/* istanbul ignore file */
export const setup = async (
  app,
  moduleToIncludes,
  version = '1.0.0',
) => {
  const options = new DocumentBuilder()
    .setVersion(version)
    .setTitle(apiTitle)
    .setDescription(apiDescription)
    .addSecurityRequirements('bearer')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'bearer',
    )
    .addBearerAuth({ type: 'http' }, 'bearer')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [...moduleToIncludes],
  });
  SwaggerModule.setup('api', app, document, {jsonDocumentUrl: `${BASE_PATH}/api-json`});

  const redocOptions: Ioption = {
    title: apiTitle,
    redocOptions: {
      sortPropsAlphabetically: true,
      hideHostname: false,
      noAutoAuth: false,
      showExtensions: true,
      nativeScrollbars: true,
    },
    specUrl: `${BASE_PATH}/api-json`,
  };

  app.use( `${BASE_PATH}/api-docs`, redoc(redocOptions));

  Logger.log(`API Docs ${BASE_PATH}/api-json`, 'doc.ts');

  return document;
};


export const setupApiDoc = async(app) => {
  return setup(
    app, 
    [
    HealthCheckModule,
    UserModule,
  ], 
  '1.0.0'
  )
}

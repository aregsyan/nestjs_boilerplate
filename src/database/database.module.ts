import { ConfigModule, ConfigService } from '@es/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log('configService.database.uri', configService.database)
        return {
          host: configService.database.host,
          port: configService.database.port,
          user: configService.database.user,
          password: configService.database.password,
          dbName: configService.database.name,
          entities: ['./dist/**/*.model.js'],
          entitiesTs: ['./src/**/*.model.ts'],
          driver: PostgreSqlDriver
        }
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MikroOrmModule]
})
export class DatabaseModule {}


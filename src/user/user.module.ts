import { AuthModule } from '@es/core';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '@es/database/database.module';
import { User } from './models/user.model';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    MikroOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

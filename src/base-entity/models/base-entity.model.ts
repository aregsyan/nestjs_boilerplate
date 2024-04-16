import { BaseModel } from '@es/database/models/base.model';
import { IsEmail } from 'class-validator';
import { Property } from '@mikro-orm/core';

export class BaseEntity extends BaseModel {

  @Property({ type: String, unique: true })
  @IsEmail()
  email: string;
}



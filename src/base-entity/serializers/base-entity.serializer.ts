import { BaseResponse } from "@es/database/serializers/base.serializer";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {IsEmail } from "class-validator";


export class BaseEntityResponse extends BaseResponse {

  @ApiProperty({
    description: 'Email address of the entity',
    type: String,
    example: 'example@example.com',
  })
  @IsEmail()
  @Expose({name: 'email'})
  email: string;
}

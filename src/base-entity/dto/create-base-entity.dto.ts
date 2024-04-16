import { IsEmail, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateBaseEntityDto {
  @ApiProperty({
    description: 'User ID',
    type: String,
    required: false,
    example: '10c24d46-a88d-4420-8aa2-8e45f9ee2166',
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    description: 'Email address of the entity',
    type: String,
    required: true,
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;
}

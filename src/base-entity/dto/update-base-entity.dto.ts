import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';


export class UpdateBaseEntityDto {
  @ApiProperty({
    description: 'Email address of the entity',
    type: String,
    required: false,
    example: 'example@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}


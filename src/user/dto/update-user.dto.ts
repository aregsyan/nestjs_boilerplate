import { UpdateBaseEntityDto } from '@es/base-entity/dto/update-base-entity.dto';
import { UserRoles } from '@es/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends UpdateBaseEntityDto {
  @ApiPropertyOptional({ 
    description: 'User first name', 
    type: String, 
    example: 'firstName' 
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({ 
      description: 'User first name', 
      type: String, 
      example: 'firstName' 
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({ 
      description: 'User role', 
      enum: UserRoles, 
      example: UserRoles.Admin 
  })
  @IsEnum(UserRoles)
  @IsOptional()
  role?: UserRoles;
}

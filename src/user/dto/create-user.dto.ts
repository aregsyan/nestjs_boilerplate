import { CreateBaseEntityDto } from "@es/base-entity/dto/create-base-entity.dto";
import { UserRoles } from "@es/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";

export class CreateUserDto extends CreateBaseEntityDto {
  @ApiProperty({ 
    description: 'User first name', 
    type: String, 
    example: 'firstName' 
  })
  @IsString()
  firstName: string;

  @ApiProperty({ 
      description: 'User first name', 
      type: String, 
      example: 'firstName' 
  })
  @IsString()
  lastName: string;

  @ApiProperty({ 
      description: 'User role', 
      enum: UserRoles, 
      example: UserRoles.Admin 
  })
  @IsEnum(UserRoles)
  role: UserRoles;
}

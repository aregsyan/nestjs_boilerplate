import { BaseEntityResponse } from "@es/base-entity/serializers/base-entity.serializer";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";


export class UserResponse extends BaseEntityResponse {
    @ApiProperty({ 
        description: 'User first name', 
        type: String, 
        example: 'firstName' 
    })
    @Expose({name: 'firstName'})
    @IsString()
    firstName: string;

    @ApiProperty({ 
        description: 'User first name', 
        type: String, 
        example: 'firstName' 
    })
    @Expose({name: 'lastName'})
    @IsString()
    lastName: string;

    @ApiProperty({ 
        description: 'User role', 
        example: 'Admin' 
    })
    @Expose({name: 'role'})
    @IsString()
    role: string;
    
}
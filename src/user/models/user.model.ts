import { BaseEntity } from "@es/base-entity/models/base-entity.model";
import { IsString } from "class-validator";
import { Entity, Property } from "@mikro-orm/core";

@Entity()
export class User extends BaseEntity {
    @Property()
    @IsString()
    firstName: string;

    @Property()
    @IsString()
    lastName: string;

    @Property()
    @IsString()
    role: string;
}
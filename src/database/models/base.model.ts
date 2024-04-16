import { IsString } from "class-validator";
import { Entity, PrimaryKey, Property, UuidType } from "@mikro-orm/core";

@Entity()
export class BaseModel {
    @IsString()
    @PrimaryKey()
    id: UuidType;

    @Property({ type: Date, default: Date.now() })
    createdAt: Date;

    @Property({ type: Date, default: Date.now() })
    updatedAt: Date;
}
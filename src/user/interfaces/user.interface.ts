import { BaseEntityInterface } from "@es/base-entity/interfaces/base-entity.interface";

export interface User extends BaseEntityInterface {
    firstName: string;
    lastName: string;
    role: string;
}
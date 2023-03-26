import { Asset } from "./asset.model";

export class UserBase {
    id = undefined;
    email: string = '';
    name: string = '';
    surname: string = '';
    default_lang: string = '';
    password: string = '';
}

export class User extends UserBase {
    actualPassword: any;
    inputPassword: any;
    image?: string;
}

export class UserPopulated extends UserBase {
    image?: Asset;

}
import {ICreateUser, IRole, Roles} from "@avans-code/shared/domain";
import {IsEmail, IsIn, IsString, IsUrl, MaxLength, MinLength} from "class-validator";

export class CreateUserDto implements ICreateUser {
    @IsString()
    @MaxLength(32)
    @MinLength(2)
    name!: string;

    @IsString()
    @MinLength(8)
    password!: string;

    @IsEmail()
    email!: string;

    @IsUrl()
    profileUrl!: string;

    @IsIn(Roles)
    role!: IRole;
}

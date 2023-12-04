import {IUpdateUser, IRole, Roles} from "@avans-code/shared/domain";
import {IsEmail, IsIn, IsString, IsUrl, MaxLength, MinLength} from "class-validator";

export class UpdateUserDto implements IUpdateUser {
    @IsString()
    @MaxLength(32)
    @MinLength(2)
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    password!: string;

    @IsUrl()
    profileUrl!: string;

    @IsIn(Roles)
    role!: IRole;
}

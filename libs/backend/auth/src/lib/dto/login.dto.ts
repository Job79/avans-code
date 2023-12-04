import {ILoginUser} from "@avans-code/shared/domain";
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto implements ILoginUser {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}

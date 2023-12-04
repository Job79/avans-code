import {IRole} from "./role";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  profileUrl: string;
  role: IRole;
}

export type ILoginUser = Pick<IUser, 'email' | 'password'>;
export type ICreateUser = Pick<IUser, 'name' | 'email' | 'password' | 'profileUrl' | 'role'>;
export type IUpdateUser = Pick<IUser, 'name' | 'email' | 'password' | 'profileUrl' | 'role'>;

import {IUser} from "./user";

export interface IComment {
  message: string;
  timestamp: Date;
  owner: Pick<IUser, '_id' | 'name'>;
}

export type ICreateComment = Pick<IComment, 'message'>;
export type IUpdateComment = Pick<IComment, 'message'>;

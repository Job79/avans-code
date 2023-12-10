import {IUser} from "./user";
import {IComment} from "./comment";

export interface ISolution {
  _id: string;
  version: number;
  assignmentVersion: number;
  assignmentId: string;
  code: string;
  timestamp: Date;
  owner: Pick<IUser, '_id' | 'name'>;
  comments: IComment[]
}

export type ICreateSolution = Pick<ISolution, 'code'>;
export type IUpdateSolution = Pick<ISolution, 'code'>;

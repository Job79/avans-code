import {IUser} from "./user";
import {INiveau} from "./niveau";
import {ITag} from "./tag";

export interface IAssignment {
  _id: string;
  name: string;
  description: string;
  isPublic: boolean;
  version: number;
  programmingLanguage: string;
  templateCode: string;
  testCode: string;
  timestamp?: Date;
  niveau: INiveau;
  tags: ITag[];
  owner: Pick<IUser, '_id' | 'name'>;
}

export type ICreateAssignment = Pick<IAssignment, 'name' | 'description' | 'isPublic' | 'programmingLanguage' | 'templateCode' | 'testCode' | 'niveau' | 'tags'>;
export type IUpdateAssignment = Pick<IAssignment, 'name' | 'description' | 'isPublic' | 'programmingLanguage' | 'templateCode' | 'testCode' | 'niveau' | 'tags'>;

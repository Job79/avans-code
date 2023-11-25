import {User} from "./user";
import {Niveau} from "./niveau";
import {Tag} from "./tag";

export interface Assignment {
  id: string;
  name: string;
  description: string;
  version: number;
  programmingLanguage: string;
  templateCode: string;
  testCode: string;
  timestamp?: Date;
  niveau: Niveau;
  tags: Tag[];
  owner?: Pick<User, 'id' | 'name'>;
}

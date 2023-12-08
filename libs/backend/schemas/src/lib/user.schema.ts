import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {IRole, IUser} from "@avans-code/shared/domain";
import {Assignment, AssignmentSchema} from "./assignment.schema";

export type UserDocument = HydratedDocument<User>;

@Schema({versionKey: false})
export class User implements IUser {
  _id!: string

  @Prop({required: true, index: true})
  name!: string;

  @Prop({required: true, unique: true})
  email!: string;

  @Prop({required: true, select: false})
  password!: string;

  @Prop({required: true})
  profileUrl!: string;

  @Prop({type: String, required: true})
  role!: IRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const OnUserDeleteHooks: ((doc: User) => Promise<void>)[] = [];
UserSchema.post('deleteOne', (doc) => { OnUserDeleteHooks.map(hook => hook(doc)) })

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {Role} from "@avans-code/shared/domain";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true})
  name!: string;

  @Prop({required: true})
  email!: string;

  @Prop({required: true})
  password!: string;

  @Prop({required: true})
  profileUrl!: string;

  @Prop({required: true, type: String})
  role!: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

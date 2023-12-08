import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Schema as S} from 'mongoose';
import {IComment, IUser} from "@avans-code/shared/domain";

export type CommentDocument = HydratedDocument<Comment>;

@Schema({versionKey: false})
export class Comment implements IComment {
  @Prop({required: true})
  message!: string;

  @Prop({required: true})
  timestamp!: Date;

  @Prop({type: {_id: S.Types.ObjectId, name: String}, required: true})
  owner!: Pick<IUser, "_id" | "name">;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

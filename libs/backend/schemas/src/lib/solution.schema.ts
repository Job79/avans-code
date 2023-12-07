import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Schema as S} from 'mongoose';
import {IComment, ISolution, IUser} from "@avans-code/shared/domain";
import {CommentSchema} from "./comment.schema";

export type SolutionDocument = HydratedDocument<Solution>;

@Schema({versionKey: false})
export class Solution implements ISolution {
    _id!: string

  @Prop({required: true})
  version!: number;

  @Prop({required: true, type: S.Types.ObjectId, ref: 'Assignment'})
  assignmentId!: string;

  @Prop({required: true})
  assignmentVersion!: number;

  @Prop({required: true})
  code!: string;

  @Prop({required: true})
  timestamp!: Date;

  @Prop({type: {id: S.Types.ObjectId, name: String}, required: true})
  owner!: Pick<IUser, "_id" | "name">;

  @Prop({type: [CommentSchema], required: true})
  comments!: IComment[];
}

export const SolutionSchema = SchemaFactory.createForClass(Solution);

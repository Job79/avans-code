import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Schema as S} from 'mongoose';
import {IAssignment, INiveau, IUser, ITag} from "@avans-code/shared/domain";
import {TagSchema} from "./tag.schema";

export type AssignmentDocument = HydratedDocument<Assignment>;

@Schema({versionKey: false})
export class Assignment implements IAssignment {
    _id!: string

    @Prop({required: true})
    description!: string;

    @Prop({required: true})
    isPublic!: boolean;

    @Prop({required: true})
    name!: string;

    @Prop({type: String, required: true})
    niveau!: INiveau;

    @Prop({type: {_id: S.Types.ObjectId, name: String}, required: true})
    owner!: Pick<IUser, "_id" | "name">;

    @Prop({required: true})
    programmingLanguage!: string;

    @Prop({type: [{_id: S.Types.ObjectId, name: String, category: String}], required: true})
    tags!: Pick<ITag, "_id" | "name" | "category">[];

    @Prop({required: true})
    templateCode!: string;

    @Prop({required: true})
    testCode!: string;

    @Prop({required: true})
    timestamp!: Date;

    @Prop({required: true})
    version!: number;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);

export const OnAssignmentDeleteHooks: ((doc: Assignment) => Promise<void>)[] = [];
AssignmentSchema.post('deleteOne', (doc) => { OnAssignmentDeleteHooks.map(hook => hook(doc)) })


import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {ITag} from "@avans-code/shared/domain";

export type TagDocument = HydratedDocument<Tag>;

@Schema({versionKey: false})
export class Tag implements ITag {
    id!: string

    @Prop({required: true, unique: true})
    name!: string;

    @Prop({required: true})
    category!: string;

    @Prop({required: true})
    isActive!: boolean;
}

export const TagSchema = SchemaFactory.createForClass(Tag);

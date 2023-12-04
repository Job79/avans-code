import { Module } from '@nestjs/common';
import {TagsController} from "./tags.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {TagsService} from "./tags.service";
import {Tag, TagSchema} from "@avans-code/backend/schemas";

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [],
})
export class TagsModule {}

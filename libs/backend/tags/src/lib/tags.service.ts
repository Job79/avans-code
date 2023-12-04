import { Tag } from '@avans-code/backend/schemas';
import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {MongoServerError} from 'mongodb'
import {CreateTagDto} from "./dto/createTagDto";
import {UpdateTagDto} from "./dto/updateTagDto";

@Injectable()
export class TagsService {

  constructor(@InjectModel(Tag.name) private readonly tagModel: Model<Tag>) {
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagModel.find().exec();
  }

  async findOne(id: string): Promise<Tag> {
    const tag = await this.tagModel.findById(id).exec()
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return tag
  }

  async create(tag: CreateTagDto): Promise<Tag> {
    try {
      const newTag = new this.tagModel(tag);
      return await newTag.save();
    } catch (err) {
      if (err instanceof MongoServerError && err.code === 11000) {
        throw new BadRequestException('Name already in use')
      }
      throw err
    }
  }

  async update(id: string, tag: UpdateTagDto): Promise<Tag> {
    try {
      const existingTag = await this.tagModel.findByIdAndUpdate(id, tag).exec();
      if (!existingTag) {
        throw new NotFoundException('Tag not found');
      }
      return existingTag;
    } catch (err) {
      if (err instanceof MongoServerError && err.code === 11000) {
        throw new BadRequestException('Tag name already in use')
      }
      throw err
    }
  }

  async remove(id: string): Promise<Tag> {
    const result = await this.tagModel.findByIdAndDelete(id)
    if (!result) {
      throw new NotFoundException('Tag not found');
    }
    return result;
  }
}

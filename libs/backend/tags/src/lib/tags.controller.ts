import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {TagsService} from "./tags.service";
import {Tag} from "@avans-code/backend/schemas";
import {CreateTagDto} from "./dto/createTagDto";
import {Roles} from "@avans-code/backend/auth";
import {UpdateTagDto} from "./dto/updateTagDto";

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getData() {
    return await this.tagsService.findAll()
  }

  @Get(':id')
  async getOne(@Param('id') id: string) : Promise<Tag> {
    return await this.tagsService.findOne(id);
  }

  @Post()
  @Roles('admin')
  async create(@Body() tag: CreateTagDto) : Promise<Tag> {
    return await this.tagsService.create(tag);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() tag: UpdateTagDto) : Promise<Tag> {
    return await this.tagsService.update(id, tag);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string) : Promise<Tag> {
    return await this.tagsService.remove(id);
  }
}

import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "./users.service";
import {User} from "@avans-code/backend/schemas";
import {CreateUserDto} from "./dto/createUserDto";
import {Roles} from "@avans-code/backend/auth";
import {UpdateUserDto} from "./dto/updateUserDto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getData() {
    return await this.usersService.findAll()
  }

  @Get(':id')
  async getOne(@Param('id') id: string) : Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Post()
  @Roles('admin')
  async create(@Body() user: CreateUserDto) : Promise<User> {
    return await this.usersService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UpdateUserDto) : Promise<User> {
    return await this.usersService.update(id, user);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string) : Promise<User> {
    return await this.usersService.remove(id);
  }
}

import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "./users.service";
import {User} from "./schemas/user.schema";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getData() {
    return await this.usersService.findAll()
  }

  @Post()
  async create(@Body() newUser: User) : Promise<User> {
    return await this.usersService.create(newUser);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedUser: User) : Promise<User> {
    return await this.usersService.update(id, updatedUser);
  }


  @Delete(':id')
  async remove(@Param('id') id: string) : Promise<User> {
    return await this.usersService.remove(id);
  }
}

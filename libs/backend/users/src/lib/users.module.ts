import { Module } from '@nestjs/common';
import {UsersController} from "./users.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {UsersService} from "./users.service";
import {User, UserSchema} from "@avans-code/backend/schemas";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [],
})
export class UsersModule {}

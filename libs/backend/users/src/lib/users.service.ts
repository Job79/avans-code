import * as bcrypt from 'bcrypt';
import {User, UserDocument} from '@avans-code/backend/schemas';
import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {MongoServerError} from 'mongodb'
import {CreateUserDto} from "./dto/createUserDto";
import {UpdateUserDto} from "./dto/updateUserDto";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec()
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user
  }

  async create(user: CreateUserDto): Promise<UserDocument> {
    try {
      const newUser = new this.userModel(user);
      newUser.password = await bcrypt.hash(newUser.password, 10);
      return await newUser.save();
    } catch (err) {
      if (err instanceof MongoServerError && err.code === 11000) {
        throw new BadRequestException('Email already in use')
      }
      throw err
    }
  }

  async update(id: string, user: UpdateUserDto): Promise<UserDocument> {
    user.password = await bcrypt.hash(user.password, 10);

    try {
      const existingUser = await this.userModel.findByIdAndUpdate(id, user).exec();
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }
      return existingUser;
    } catch (err) {
      if (err instanceof MongoServerError && err.code === 11000) {
        throw new BadRequestException('Email already in use')
      }
      throw err
    }
  }

  async remove(id: string): Promise<UserDocument> {
    const result = await this.userModel.findByIdAndDelete(id)
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }
}

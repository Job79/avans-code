import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./schemas/user.schema";
import {Model} from "mongoose";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
  }

  async create(user: User): Promise<User> {
    const newMeal = new this.userModel(user);
    return await newMeal.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec()
    if (!user) {
      throw new Error('User not found');
    }
    return user
  }

  async update(id: string, user: User): Promise<User> {
    const result = await this.userModel.findByIdAndUpdate(id, user, {new: true});
    if (!result) {
      throw new Error('User not found');
    }

    return result;
  }

  async remove(id: string): Promise<User> {
    const result = await this.userModel.findByIdAndRemove(ObjectId(id))
    if (!result) {
      throw new Error('User not found');
    }

    return result;
  }
}

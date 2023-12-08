import {Solution, SolutionDocument, User} from '@avans-code/backend/schemas';
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateCommentDto} from "./dto/createCommentDto";
import { IComment } from '@avans-code/shared/domain';

@Injectable()
export class CommentsService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Solution.name) private solutionModel: Model<Solution>
  ) {
  }

  async addComment(userId: string, solution: SolutionDocument, newComment: CreateCommentDto): Promise<IComment> {
    const owner = await this.userModel.findById(userId).exec();
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    const comment = {
      ...newComment,
      timestamp: new Date(),
      owner: {
        _id: owner._id,
        name: owner.name
      },
    }

    solution.comments.push(comment)
    await solution.save();
    return comment;
  }
}

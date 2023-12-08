import {Assignment, AssignmentDocument, Solution, SolutionDocument, User} from '@avans-code/backend/schemas';
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateSolutionDto} from "./dto/createSolutionDto";
import {UpdateSolutionDto} from "./dto/updateSolutionDto";

@Injectable()
export class SolutionsService {

  constructor(
    @InjectModel(Solution.name) private solutionModel: Model<Solution>,
    @InjectModel(Assignment.name) private assignmentModel: Model<Assignment>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
  }

  async findByAssignmentId(assignmentId: string): Promise<SolutionDocument[]> {
    return await this.solutionModel.find({assignmentId}).exec();
  }

  async findByAssignmentIdAndId(assignmentId: string, id: string): Promise<SolutionDocument> {
    const solution = await this.solutionModel.findById(id).exec()
    if (!solution || solution.assignmentId.toString() !== assignmentId) {
      throw new NotFoundException('Solution not found');
    }
    return solution
  }

  async create(userId: string, assignmentId: string, solution: CreateSolutionDto): Promise<SolutionDocument> {
    const owner = await this.userModel.findById(userId).exec();
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    return await new this.solutionModel({
      ...solution,
      version: 1,
      assignmentId: assignmentId,
      assignmentVersion: (await this.getAssignmentById(assignmentId)).version,
      timestamp: new Date(),
      owner: {
        _id: owner._id,
        name: owner.name
      }
    }).save();
  }

  async update(solution: SolutionDocument, newSolution: UpdateSolutionDto): Promise<SolutionDocument> {
    solution.set({
      ...newSolution,
      version: solution.version + 1,
      assignmentVersion: (await this.getAssignmentById(solution.assignmentId)).version,
      timestamp: new Date(),
      owner: solution.owner
    });
    return await solution.save();
  }

  async remove(solution: SolutionDocument): Promise<SolutionDocument> {
    const result = await this.solutionModel.findByIdAndDelete(solution._id)
    if (!result) {
      throw new NotFoundException('Solution not found');
    }
    return result;
  }

  private async getAssignmentById(id: string): Promise<AssignmentDocument> {
    const assignment = await this.assignmentModel.findById(id).exec()
    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }
    return assignment
  }
}

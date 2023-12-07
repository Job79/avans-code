import {Assignment, Solution, User} from '@avans-code/backend/schemas';
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateSolutionDto} from "./dto/createSolutionDto";
import {AuthUser} from "@avans-code/backend/auth";
import {UpdateSolutionDto} from "./dto/updateSolutionDto";
import {RecommendationsService} from "@avans-code/backend/recommendations";

@Injectable()
export class SolutionsService {

  constructor(@InjectModel(Solution.name) private readonly solutionModel: Model<Solution>,
              @InjectModel(Assignment.name) private readonly assignmentModel: Model<Assignment>,
              @InjectModel(User.name) private readonly userModel: Model<User>,
              private readonly recommendationsService: RecommendationsService
  ) {
  }

  async findByAssignmentId(assignmentId: string): Promise<Solution[]> {
    return await this.solutionModel.find({assignmentId}).exec();
  }

  async findByAssignmentIdAndId(assignmentId: string, id: string): Promise<Solution> {
    const solution = await this.solutionModel.findById(id).exec()
    if (!solution || solution.assignmentId !== assignmentId) {
      throw new NotFoundException('Solution not found');
    }
    return solution
  }

  async create(user: AuthUser, assignmentId: string, solution: CreateSolutionDto): Promise<Solution> {
    const assignment = await this.assignmentModel.findById(assignmentId).exec()
    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    const owner = await this.userModel.findById(user.id).exec();
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    const newSolution = new this.solutionModel({
      ...solution,
      version: 1,
      assignmentId: assignmentId,
      assignmentVersion: assignment.version,
      timestamp: new Date(),
      owner: {
        _id: owner._id,
        name: owner.name
      }
    });

    const createdSolution = await newSolution.save();
    await this.recommendationsService.setUserAssignmentRelation(user.id, assignmentId, new Date());
    return createdSolution;
  }

  async update(id: string, user: AuthUser, assignmentId: string, solution: UpdateSolutionDto): Promise<Solution> {
    const existingSolution = await this.solutionModel.findById(id);
    if (!existingSolution || existingSolution.assignmentId.toString() !== assignmentId || (user.role !== 'admin' && existingSolution.owner._id.toString() !== user.id)) {
      throw new NotFoundException('Solution not found');
    }

    const assignment = await this.assignmentModel.findById(assignmentId).exec()
    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    existingSolution.set({
      ...solution,
      version: existingSolution.version + 1,
      assignmentVersion: assignment.version,
      timestamp: new Date(),
      owner: existingSolution.owner
    });
    return await existingSolution.save();
  }

  async remove(id: string): Promise<Solution> {
    const result = await this.solutionModel.findByIdAndDelete(id)
    if (!result) {
      throw new NotFoundException('Solution not found');
    }
    return result;
  }
}

import {Assignment, AssignmentDocument, Tag, TagDocument, User} from '@avans-code/backend/schemas';
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateAssignmentDto} from "./dto/createAssignmentDto";
import {UpdateAssignmentDto} from "./dto/updateAssignmentDto";
import {QueryAssignmentDto} from "./dto/queryAssignmentDto";

@Injectable()
export class AssignmentsService {

  constructor(@InjectModel(Assignment.name) private assignmentModel: Model<Assignment>,
              @InjectModel(Tag.name) private tagModel: Model<Tag>,
              @InjectModel(User.name) private userModel: Model<User>) {
  }

  async find(query: QueryAssignmentDto): Promise<AssignmentDocument[]> {
    const x = QueryAssignmentDto.buildQuery(query)
    return await this.assignmentModel.find(x).exec();
  }

  async findOne(id: string): Promise<AssignmentDocument> {
    const assignment = await this.assignmentModel.findById(id).exec()
    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }
    return assignment
  }

  async create(userId: string, assignment: CreateAssignmentDto): Promise<AssignmentDocument> {
    const owner = await this.userModel.findById(userId).exec();
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    return await new this.assignmentModel({
      ...assignment,
      version: 1,
      tags: await this.getTagsByNames(assignment.tags.map(({name}) => name)),
      timestamp: new Date(),
      owner: {
        _id: owner._id,
        name: owner.name
      }
    }).save();
  }

  async update(assignment: AssignmentDocument, newAssignment: UpdateAssignmentDto): Promise<AssignmentDocument> {
    assignment.set({
      ...newAssignment,
      version: assignment.version + 1,
      tags: await this.getTagsByNames(newAssignment.tags.map(({name}) => name)),
      timestamp: new Date(),
      owner: assignment.owner
    });
    return await assignment.save();
  }

  async remove(assignment: AssignmentDocument): Promise<AssignmentDocument> {
    const result = await this.assignmentModel.findByIdAndDelete(assignment._id)
    if (!result) {
      throw new NotFoundException('Assignment not found');
    }
    return result;
  }

  private async getTagsByNames(names: string[]): Promise<TagDocument[]> {
    const tags = await this.tagModel.find({name: {$in: names}}).exec();
    const notFoundTags = names.filter(name => !tags.find(tag => tag.name === name));
    if (notFoundTags.length > 0) {
      throw new NotFoundException(`Given tags not found: ${notFoundTags.map(name => name).join(', ')}`)
    }
    return tags;
  }
}

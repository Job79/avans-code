import {Assignment, Tag, User} from '@avans-code/backend/schemas';
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateAssignmentDto} from "./dto/createAssignmentDto";
import {AuthUser} from "@avans-code/backend/auth";
import {UpdateAssignmentDto} from "./dto/updateAssignmentDto";

@Injectable()
export class AssignmentsService {

    constructor(@InjectModel(Assignment.name) private readonly assignmentModel: Model<Assignment>,
                @InjectModel(Tag.name) private readonly tagModel: Model<Tag>,
                @InjectModel(User.name) private readonly userModel: Model<User>) {
    }

    async findAll(): Promise<Assignment[]> {
        return await this.assignmentModel.find().exec();
    }

    async findOne(id: string): Promise<Assignment> {
        const assignment = await this.assignmentModel.findById(id).exec()
        if (!assignment) {
            throw new NotFoundException('Assignment not found');
        }
        return assignment
    }

    async create(user: AuthUser, assignment: CreateAssignmentDto): Promise<Assignment> {
        const tags = await this.tagModel.find({name: {$in: assignment.tags.map(({name}) => name)}}).exec();
        const notFoundTags = assignment.tags.filter(({name}) => !tags.find(tag => tag.name === name));
        if (notFoundTags.length > 0) {
            throw new NotFoundException(`Given tags not found: ${notFoundTags.map(({name}) => name).join(', ')}`)
        }

        const owner = await this.userModel.findById(user.id).exec();
        if (!owner) {
            throw new NotFoundException('Owner not found');
        }

        const newAssignment = new this.assignmentModel({
            ...assignment,
            version: 1,
            tags: tags,
            timestamp: new Date(),
            owner: {
                _id: owner._id,
                name: owner.name
            }
        });

        return await newAssignment.save();
    }

    async update(id: string, user: AuthUser, assignment: UpdateAssignmentDto): Promise<Assignment> {
        const existingAssignment = await this.assignmentModel.findById(id);
        if (!existingAssignment || (user.role !== 'admin' && existingAssignment.owner._id.toString() !== user.id)) {
            throw new NotFoundException('Assignment not found');
        }

        const tags = await this.tagModel.find({name: {$in: assignment.tags.map(({name}) => name)}}).exec();
        const notFoundTags = assignment.tags.filter(({name}) => !tags.find(tag => tag.name === name));
        if (notFoundTags.length > 0) {
            throw new NotFoundException(`Given tags not found: ${notFoundTags.map(({name}) => name).join(', ')}`)
        }

        existingAssignment.set({
            ...assignment,
            version: existingAssignment.version + 1,
            tags: tags,
            timestamp: new Date(),
            owner: existingAssignment.owner
        });
        return await existingAssignment.save();
    }

    async remove(id: string): Promise<Assignment> {
        const result = await this.assignmentModel.findByIdAndDelete(id)
        if (!result) {
            throw new NotFoundException('Assignment not found');
        }
        return result;
    }
}

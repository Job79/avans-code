import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query,
  UnauthorizedException
} from '@nestjs/common';
import {AssignmentsService} from "./assignments.service";
import {Assignment} from "@avans-code/backend/schemas";
import {CreateAssignmentDto} from "./dto/createAssignmentDto";
import {AuthUser, Public, User} from "@avans-code/backend/auth";
import {UpdateAssignmentDto} from "./dto/updateAssignmentDto";
import {QueryAssignmentDto} from "./dto/queryAssignmentDto";

@Controller('assignments')
export class AssignmentsController {
  constructor(private assignmentsService: AssignmentsService) {
  }

  @Public()
  @Get()
  async getData(@Query() query: QueryAssignmentDto) {
    return await this.assignmentsService.find(query)
  }

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Assignment> {
    return await this.assignmentsService.findOne(id);
  }

  @Post()
  async create(@Body() assignment: CreateAssignmentDto, @User() user: AuthUser): Promise<Assignment> {
    return await this.assignmentsService.create(user.id, assignment);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() newAssignment: UpdateAssignmentDto, @User() user: AuthUser): Promise<Assignment> {
    const assignment = await this.assignmentsService.findOne(id);
    if (user.role !== 'admin' && assignment.owner._id !== user.id) {
      throw new UnauthorizedException('User has no access to update this assignment');
    }
    return await this.assignmentsService.update(assignment, newAssignment);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: AuthUser): Promise<Assignment> {
    const assignment = await this.assignmentsService.findOne(id);
    if (user.role !== 'admin' && assignment.owner._id !== user.id) {
      throw new UnauthorizedException('User has no access to delete this assignment');
    }
    return await this.assignmentsService.remove(assignment);
  }
}

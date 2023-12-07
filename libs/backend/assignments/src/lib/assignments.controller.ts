import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {AssignmentsService} from "./assignments.service";
import {Assignment} from "@avans-code/backend/schemas";
import {CreateAssignmentDto} from "./dto/createAssignmentDto";
import {AuthUser, User} from "@avans-code/backend/auth";
import {UpdateAssignmentDto} from "./dto/updateAssignmentDto";

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get()
  async getData() {
    return await this.assignmentsService.findAll()
  }

  @Get(':id')
  async getOne(@Param('id') id: string) : Promise<Assignment> {
    return await this.assignmentsService.findOne(id);
  }

  @Post()
  async create(@Body() assignment: CreateAssignmentDto, @User() user : AuthUser) : Promise<Assignment> {
    return await this.assignmentsService.create(user, assignment);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() assignment: UpdateAssignmentDto, @User() user : AuthUser) : Promise<Assignment> {
    return await this.assignmentsService.update(id, user, assignment);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) : Promise<Assignment> {
    return await this.assignmentsService.remove(id);
  }
}

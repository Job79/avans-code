import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {SolutionsService} from "./solutions.service";
import {Solution} from "@avans-code/backend/schemas";
import {CreateSolutionDto} from "./dto/createSolutionDto";
import {AuthUser, User} from "@avans-code/backend/auth";
import {UpdateSolutionDto} from "./dto/updateSolutionDto";

@Controller('assignments/:assignmentId/solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Get()
  async getData(@Param('assignmentId') assignmentId: string) {
    return await this.solutionsService.findByAssignmentId(assignmentId)
  }

  @Get(':id')
  async getOne(@Param('assignmentId') assignmentId: string, @Param('id') id: string) : Promise<Solution> {
    return await this.solutionsService.findByAssignmentIdAndId(assignmentId, id);
  }

  @Post()
  async create(@Param('assignmentId') assignmentId: string, @Body() solution: CreateSolutionDto, @User() user : AuthUser) : Promise<Solution> {
    return await this.solutionsService.create(user, assignmentId, solution);
  }

  @Put(':id')
  async update(@Param('assignmentId') assignmentId: string, @Param('id') id: string, @Body() solution: UpdateSolutionDto, @User() user : AuthUser) : Promise<Solution> {
    return await this.solutionsService.update(id, user, assignmentId, solution);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) : Promise<Solution> {
    return await this.solutionsService.remove(id);
  }
}

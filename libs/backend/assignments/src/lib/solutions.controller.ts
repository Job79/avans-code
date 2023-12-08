import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UnauthorizedException
} from '@nestjs/common';
import {SolutionsService} from "./solutions.service";
import {Solution} from "@avans-code/backend/schemas";
import {CreateSolutionDto} from "./dto/createSolutionDto";
import {AuthUser, User} from "@avans-code/backend/auth";
import {UpdateSolutionDto} from "./dto/updateSolutionDto";

@Controller('assignments/:assignmentId/solutions')
export class SolutionsController {
  constructor(private solutionsService: SolutionsService) {
  }

  @Get()
  async getData(@Param('assignmentId') assignmentId: string) {
    return await this.solutionsService.findByAssignmentId(assignmentId)
  }

  @Get(':id')
  async getOne(@Param('assignmentId') assignmentId: string, @Param('id') id: string): Promise<Solution> {
    console.log(assignmentId, id)
    return await this.solutionsService.findByAssignmentIdAndId(assignmentId, id);
  }

  @Post()
  async create(@Param('assignmentId') assignmentId: string, @Body() solution: CreateSolutionDto, @User() user: AuthUser): Promise<Solution> {
    return await this.solutionsService.create(user.id, assignmentId, solution);
  }

  @Put(':id')
  async update(@Param('assignmentId') assignmentId: string, @Param('id') id: string, @Body() newSolution: UpdateSolutionDto, @User() user: AuthUser): Promise<Solution> {
    const solution = await this.solutionsService.findByAssignmentIdAndId(assignmentId, id);
    if (user.role !== 'admin' && solution.owner._id !== user.id) {
      throw new UnauthorizedException('User has no access to update this solution');
    }
    return await this.solutionsService.update(solution, newSolution);
  }

  @Delete(':id')
  async remove(@Param('assignmentId') assignmentId: string, @Param('id') id: string, @User() user: AuthUser): Promise<Solution> {
    const solution = await this.solutionsService.findByAssignmentIdAndId(assignmentId, id);
    if (user.role !== 'admin' && solution.owner._id !== user.id) {
      throw new UnauthorizedException('User has no access to delete this solution');
    }
    return await this.solutionsService.remove(solution);
  }
}

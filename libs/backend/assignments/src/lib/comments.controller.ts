import {
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import {SolutionsService} from "./solutions.service";
import {AuthUser, User} from "@avans-code/backend/auth";
import {CreateCommentDto} from "./dto/createCommentDto";
import {CommentsService} from "./comments.service";

@Controller('assignments/:assignmentId/solutions/:solutionId/comments')
export class CommentsController {
  constructor(private solutionsService: SolutionsService, private commentsService: CommentsService) {
  }

  @Post()
  async create(@Param('assignmentId') assignmentId: string, @Param('solutionId') solutionId: string, @Body() comment: CreateCommentDto, @User() user: AuthUser) {
    const solution = await this.solutionsService.findByAssignmentIdAndId(assignmentId, solutionId);
    return await this.commentsService.addComment(user.id, solution, comment);
  }
}

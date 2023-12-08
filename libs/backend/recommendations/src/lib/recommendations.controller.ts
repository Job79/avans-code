import {
  Controller,
  Get,
} from '@nestjs/common';
import {RecommendationsService} from "./recommendations.service";
import {AuthUser, User} from "@avans-code/backend/auth";

@Controller('recommendations')
export class RecommendationsController {
  constructor(private recommendationsService: RecommendationsService) {
  }

  @Get()
  async getData(@User() user: AuthUser) {
    return await this.recommendationsService.getRecommendationsForUser(user.id)
  }
}

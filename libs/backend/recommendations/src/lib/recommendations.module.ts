import {Module, OnModuleInit} from '@nestjs/common';
import {Neo4jModule, Neo4jScheme} from 'nest-neo4j';
import {RecommendationsService} from "./recommendations.service";
import {Neo4jConnection} from "nest-neo4j/dist";
import {
  OnAssignmentDeleteHooks,
  OnSolutionCreateHooks,
  OnSolutionDeleteHooks, OnUserDeleteHooks,
} from "@avans-code/backend/schemas";
import {RecommendationsController} from "./recommendations.controller";

@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: process.env['NEO4J_SCHEME'] as Neo4jScheme || 'bolt',
      host: process.env['NEO4J_HOST'] || 'localhost',
      port: process.env['NEO4J_PORT'] || '7687',
      username: process.env['NEO4J_USERNAME'] || 'neo4j',
      password: process.env['NEO4J_PASSWORD'] || 'password',
      database: process.env['NEO4J_DATABASE'] || 'neo4j'
    } as Neo4jConnection),
  ],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
  exports: [RecommendationsService],
})
export class RecommendationsModule implements OnModuleInit {
  constructor(private recommendationsService: RecommendationsService) {
  }

  async onModuleInit() {
    OnSolutionCreateHooks.push((solution) => this.recommendationsService.addSolution(solution))
    OnSolutionDeleteHooks.push((solution) => this.recommendationsService.removeSolution(solution))
    OnAssignmentDeleteHooks.push((assignment) => this.recommendationsService.removeAssignment(assignment))
    OnUserDeleteHooks.push((user) => this.recommendationsService.removeUser(user))
  }
}

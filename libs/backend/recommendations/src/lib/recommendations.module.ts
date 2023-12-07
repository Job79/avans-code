import {Module} from '@nestjs/common';
import {Neo4jModule, Neo4jScheme} from 'nest-neo4j';
import {RecommendationsService} from "./recommendations.service";
import {Neo4jConnection} from "nest-neo4j/dist";

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
  controllers: [],
  providers: [RecommendationsService],
  exports: [RecommendationsService],
})
export class RecommendationsModule {
}

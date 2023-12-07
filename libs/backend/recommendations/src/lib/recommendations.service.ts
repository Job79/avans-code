import {Injectable} from '@nestjs/common';
import {Neo4jService} from "nest-neo4j/dist";

@Injectable()
export class RecommendationsService {

  constructor(private readonly neo4jService: Neo4jService) {
  }


  public async setUserAssignmentRelation(userId: string, assignmentId: string, timestamp: Date) {
    const query = 'MERGE (u:USER {userId: $userId}) ' +
      'MERGE (a:ASSIGNMENT {assignmentId: $assignmentId}) ' +
      'MERGE (u)-[r:MADE {timestamp: $timestamp}]->(a)'

    await this.neo4jService.write(query, {
      userId,
      assignmentId,
      timestamp: Math.floor(timestamp.getTime() / 1000)
    });
  }

  public async getRecommendationsForUser(userId: string): Promise<string[]> {
    const query = 'MATCH (user:USER {userId: $userId})-[:MADE]->(:ASSIGNMENT)<-[:MADE]-(otherUser:USER)-[:MADE]->(otherAssignment:ASSIGNMENT) ' +
      'RETURN otherAssignment.assignmentId, COUNT(*) AS count ' +
      'ORDER BY count'

    const result = await this.neo4jService.read(query,{userId});
    console.log(result);

    return [];
  }

  public async removeUser(userId: string) {
    const query = 'MATCH (u:USER {userId: $userId})-[r:MADE] DELETE u, r'
    await this.neo4jService.write(query, {userId});
  }

  public async removeAssignment(assignmentId: string){
    const query = 'MATCH (a:ASSIGNMENT {assignmentId: $assignmentId})-[r:MADE] DELETE a, r'
    await this.neo4jService.write(query, {assignmentId});
  }
}

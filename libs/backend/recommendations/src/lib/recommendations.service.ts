import {Injectable} from '@nestjs/common';
import {Neo4jService} from "nest-neo4j/dist";
import {Assignment, Solution, User} from "@avans-code/backend/schemas";

@Injectable()
export class RecommendationsService {

  constructor(private readonly neo4jService: Neo4jService) {
  }

  public async getRecommendationsForUser(userId: string): Promise<string[]> {
    const oneYearAgo = Math.floor((Date.now() - 365 * 24 * 60 * 60 * 1000) / 1000);
    const query = 'MATCH (user:USER {userId: $userId})-[r:MADE]->(:ASSIGNMENT)<-[:MADE]-(otherUser:USER)-[:MADE]->(otherAssignment:ASSIGNMENT) ' +
      'WHERE r.timestamp > $oneYearAgo AND NOT (user)-[:MADE]->(otherAssignment) ' +
      'RETURN otherAssignment.assignmentId, COUNT(*) AS count ' +
      'ORDER BY count'

    const result = await this.neo4jService.read(query, {userId, oneYearAgo});
    return result.records.map(record => record.get('otherAssignment.assignmentId'));
  }

  public async addSolution(solution: Solution) {
    const query = 'MERGE (u:USER {userId: $userId}) ' +
      'MERGE (a:ASSIGNMENT {assignmentId: $assignmentId}) ' +
      'MERGE (u)-[r:MADE {timestamp: $timestamp}]->(a)'

    await this.neo4jService.write(query, {
      userId: solution.owner._id.toString(),
      assignmentId: solution.assignmentId.toString(),
      timestamp: Math.floor(solution.timestamp.getTime() / 1000)
    });
  }

  public async removeSolution(solution: Solution) {
    const query = 'MATCH (u:USER {userId: $userId})-[r:MADE]->(a:ASSIGNMENT {assignmentId: $assignmentId}) DELETE r'
    await this.neo4jService.write(query, {
      userId: solution.owner._id.toString(),
      assignmentId: solution.assignmentId.toString()
    });
  }

  public async removeUser(user: User) {
    const query = 'MATCH (u:USER {userId: $userId})-[r:MADE] DELETE u, r'
    await this.neo4jService.write(query, {userId: user._id.toString()});
  }

  public async removeAssignment(assignment: Assignment) {
    const query = 'MATCH (a:ASSIGNMENT {assignmentId: $assignmentId})-[r:MADE] DELETE a, r'
    await this.neo4jService.write(query, {assignmentId: assignment._id.toString()});
  }
}

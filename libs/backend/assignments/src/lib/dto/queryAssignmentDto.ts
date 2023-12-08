import {IsArray, IsOptional} from "class-validator";

export class QueryAssignmentDto {
  @IsOptional()
  @IsArray()
  tags!: string[]

  static buildQuery(dto: QueryAssignmentDto) {
    const query: {[key: string]: string|{[e:string]: string[]}}  = {}
    if (dto.tags) {
      query['tags.name'] = {'$all': dto.tags}
    }

    return query
  }
}

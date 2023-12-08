import {Module} from '@nestjs/common';
import {AssignmentsController} from "./assignments.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {AssignmentsService} from "./assignments.service";
import {
  Assignment,
  AssignmentSchema,
  Solution,
  SolutionSchema,
  Tag,
  TagSchema,
  User,
  UserSchema
} from "@avans-code/backend/schemas";
import {SolutionsController} from "./solutions.controller";
import {SolutionsService} from "./solutions.service";
import {CommentsController} from "./comments.controller";
import {CommentsService} from "./comments.service";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Assignment.name, schema: AssignmentSchema}]),
    MongooseModule.forFeature([{name: Solution.name, schema: SolutionSchema}]),
    MongooseModule.forFeature([{name: Tag.name, schema: TagSchema}]),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
  controllers: [SolutionsController, AssignmentsController, CommentsController],
  providers: [SolutionsService, AssignmentsService, CommentsService],
  exports: [],
})
export class AssignmentsModule {
}

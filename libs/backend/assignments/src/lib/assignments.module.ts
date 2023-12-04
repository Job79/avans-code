import {Module} from '@nestjs/common';
import {AssignmentsController} from "./assignments.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {AssignmentsService} from "./assignments.service";
import {Assignment, AssignmentSchema, Tag, TagSchema, User, UserSchema} from "@avans-code/backend/schemas";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Assignment.name, schema: AssignmentSchema}]),
        MongooseModule.forFeature([{name: Tag.name, schema: TagSchema}]),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ],
    controllers: [AssignmentsController],
    providers: [AssignmentsService],
    exports: [],
})
export class AssignmentsModule {
}

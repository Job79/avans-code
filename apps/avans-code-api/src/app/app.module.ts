import {Module} from '@nestjs/common';
import {UsersModule} from "@avans-code/backend/users";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "@avans-code/backend/auth";
import {AssignmentsModule} from "@avans-code/backend/assignments";
import {TagsModule} from "../../../../libs/backend/tags/src/lib/tags.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env['MONGODB_CONNECTION_STRING'] ?? 'mongodb://localhost/avans-code'),
    UsersModule,
    AuthModule,
    AssignmentsModule,
    TagsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}

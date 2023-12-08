import {Module} from '@nestjs/common';
import {UsersModule} from "@avans-code/backend/users";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "@avans-code/backend/auth";
import {AssignmentsModule} from "@avans-code/backend/assignments";
import {TagsModule} from "@avans-code/backend/tags";
import {RecommendationsModule} from "@avans-code/backend/recommendations";
import {ConfigModule} from "@nestjs/config"

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env['MONGODB_CONNECTION_STRING'] ?? 'mongodb://localhost/avans-code'),
    UsersModule,
    AuthModule,
    AssignmentsModule,
    TagsModule,
    RecommendationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}

import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import {UsersModule} from "@avans-code/backend/users";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot(process.env['MONGODB_CONNECTION_STRING'] ?? 'mongodb://localhost/avans-code'),
    UsersModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import {UsersModule} from "@avans-code/backend/users";

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {JwtModule} from "@nestjs/jwt";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./auth.guard";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "@avans-code/backend/schemas";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env['JWT_SECRET']!,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, {provide: APP_GUARD, useClass: AuthGuard}],
  exports: [AuthService],
})
export class AuthModule {}

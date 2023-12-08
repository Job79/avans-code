import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {Public} from "./decorators/public.decorator";
import {LoginDto} from "./dto/login.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Public()
  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }
}


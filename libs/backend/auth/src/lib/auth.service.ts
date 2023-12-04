import * as bcrypt from 'bcrypt';
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from '@nestjs/jwt';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "@avans-code/backend/schemas";
import {Model} from "mongoose";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService
  ) {
  }

  async signIn(email: string, password: string) {
    const user = await this.userModel.findOne({email}).exec();
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException();
    }

    return {
      token: await this.jwtService.signAsync({
        id: user.id,
        role: user.role
      }),
    };
  }
}

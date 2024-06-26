import * as bcrypt from 'bcrypt';
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from '@nestjs/jwt';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "@avans-code/backend/schemas";
import {Model} from "mongoose";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {
  }

  async signIn(email: string, password: string) {
    const user = await this.userModel.findOne({email}).select('+password').exec();
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException();
    }

    return {
      _id: user._id,
      name: user.name,
      role: user.role,
      token: await this.jwtService.signAsync({
        id: user.id,
        role: user.role
      }),
    };
  }
}

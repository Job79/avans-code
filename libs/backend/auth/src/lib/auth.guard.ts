import {CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC} from "./decorators/public.decorator";
import {ROLES} from "./decorators/role.decorator";
import {IRole} from "@avans-code/shared/domain";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
              private reflector: Reflector) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC,
      [context.getHandler(), context.getClass()]
    );
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.jwtService.verifyAsync(token);
      const requiredRoles = this.reflector.getAllAndOverride<IRole[]>(
        ROLES,
        [context.getHandler(), context.getClass()]
      );

      if (requiredRoles && !requiredRoles.includes(user.role!)) {
        return false
      }

      request['user'] = user;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}

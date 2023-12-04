import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {IUser} from "@avans-code/shared/domain";

export type AuthUser = Pick<IUser, '_id' | 'role'>
export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);

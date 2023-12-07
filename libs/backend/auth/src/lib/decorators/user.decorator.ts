import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {IRole} from "@avans-code/shared/domain";

export type AuthUser = {id: string, role: IRole}
export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);

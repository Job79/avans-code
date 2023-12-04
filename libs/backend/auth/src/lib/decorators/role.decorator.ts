import {SetMetadata} from '@nestjs/common';
import {IRole} from "@avans-code/shared/domain";

export const ROLES = 'ROLES';
export const Roles = (...roles: IRole[]) => SetMetadata(ROLES, roles);

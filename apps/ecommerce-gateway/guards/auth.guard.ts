import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Request is using Public decorator
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) {
            return true;
        }

        if (await super.canActivate(context)) {
            return true;
        }
        return false;
    }
}

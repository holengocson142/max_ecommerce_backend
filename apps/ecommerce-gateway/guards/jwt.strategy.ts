import { CachingService } from '@app/caching';
import { ConfigService } from '@app/config';
import { MainRepo } from '@app/repositories';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type Payload = { id: number; iat: number; exp: number; sub: string };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private _mainRepo: MainRepo, private _caching: CachingService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: ConfigService.getInstance().get('JWT_MOBILE_SECRET_KEY')
        });
    }

    async validate(payload: Payload) {
        const { id, sub } = payload;

        const isBlacklist = await this._caching.get(`BLACKLIST_${sub}`);
        if (isBlacklist) {
            throw new UnauthorizedException();
        }

        const account = await this._mainRepo.account.findUnique({
            where: { id }
        });

        if (!account) {
            throw new UnauthorizedException();
        }
        return { ...account, ...payload };
    }
}

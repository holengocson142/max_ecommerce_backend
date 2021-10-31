import { CachingService } from '@app/caching';
import { ConfigService } from '@app/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '@app/common/dto/RequestDto';
import { MainRepo } from '@app/repositories';

@Injectable()
export class JwtCDNStrategy extends PassportStrategy(Strategy, 'jwt-cdn') {
    constructor(private _mainRepo: MainRepo, private _caching: CachingService) {
        super({
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
            secretOrKey: ConfigService.getInstance().get('JWT_CDN_SECRET_KEY')
        });
    }

    async validate(payload: JwtPayload) {
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

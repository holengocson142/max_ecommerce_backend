import { MainRepoModule } from '@app/repositories/main';
import { CachingModule } from '@libs/caching';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtCDNStrategy } from '../guards/jwt-cdn.strategy';
import { JwtStrategy } from '../guards/jwt.strategy';
import { createClientProxies } from '../providers/services.providers';
import { ProfileProxyController } from './profile-proxy.controller';

@Module({
    imports: [HttpModule.register({}), MainRepoModule, CachingModule],
    controllers: [ProfileProxyController],
    providers: [JwtStrategy, JwtCDNStrategy, ...createClientProxies()],
    exports: []
})
export class AppModule {}

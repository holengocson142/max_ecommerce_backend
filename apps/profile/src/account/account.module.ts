import { CachingModule } from '@app/caching';
import { SERVICES } from '@app/common';
import { ConfigService } from '@app/config';
import { MainRepoModule } from '@app/repositories';
import { UtilsModule } from '@app/utils';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { AccountService } from './account.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: ['jwt'] }),
        JwtModule.registerAsync({ useFactory: () => ConfigService.getInstance().getMobileJwtConfig() }),
        UtilsModule,
        MainRepoModule,
        CachingModule
    ],
    providers: [AccountService],
    exports: [AccountService]
})
export class AccountModule {}

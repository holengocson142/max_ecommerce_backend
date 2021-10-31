import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
    imports: [AccountModule],
    controllers: [ProfileController],
    providers: [ProfileService]
})
export class ProfileModule {}

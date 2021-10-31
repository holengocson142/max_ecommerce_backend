import { UtilsModule } from '@app/utils';
import { Module } from '@nestjs/common';
import { MainRepo } from './main.repo';

@Module({
    imports: [UtilsModule],
    providers: [MainRepo],
    exports: [MainRepo]
})
export class MainRepoModule {}

import { ConfigService } from '@app/config';
import { SERVICES } from '@libs/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ProfileModule } from './profile.module';

const logger = new Logger('Ecommerce-Profile');

async function bootstrap() {
    const app = await NestFactory.createMicroservice(ProfileModule, ConfigService.getInstance().profileQueueOptions());
    await app.listen();
    logger.log(`Ecommerce-Profile is listening on queue: ${ConfigService.getInstance().getQueueName(SERVICES.PROFILE)}`);
}
bootstrap();

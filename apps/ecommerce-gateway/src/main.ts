import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'body-parser';
import { ConfigService } from '@app/config';
import { AppModule } from './app.module';

const logger = new Logger('Ecommerce-Main');

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableVersioning({ type: VersioningType.URI });
    app.setGlobalPrefix('/api');

    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    app.enableCors({ origin: '*', allowedHeaders: '*' });

    if (['development', 'staging'].includes(ConfigService.getInstance().nodeEnv)) {
        const { setupSwagger } = await import('../swagger');
        setupSwagger(app);
    }

    const port = 3000;
    await app.listen(port, () => logger.log(`Ecommerce-Main is running at http://localhost:${port}`));
}
bootstrap();

import { SERVICES } from '@app/common';
import { ConfigService } from '@app/config';
import { Provider } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

export function createClientProxies(): Provider[] {
    return [
        {
            provide: SERVICES.PROFILE,
            useFactory: () => ClientProxyFactory.create(ConfigService.getInstance().profileQueueOptions())
        }
    ];
}

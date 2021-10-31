import { MESSAGE_PATTERN } from '@app/common';
import { Ack } from '@app/common/decorators/ack.decorator';
import { RegisterEmailAccountBody } from '@app/common/dto/AccountDto';
import { RequestPayload } from '@app/common/dto/RequestDto';
import { ServiceHttpExceptionFilter } from '@app/common/filters/service-http-exception-filter';
import { Controller, Get, Logger, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AccountService } from './account/account.service';
import { ProfileService } from './profile.service';

@UseFilters(ServiceHttpExceptionFilter)
@Controller()
export class ProfileController {
    private readonly _logger = new Logger(ProfileController.name);

    constructor(private readonly _profileService: ProfileService, private readonly _accountService: AccountService) {}

    @MessagePattern(MESSAGE_PATTERN.PROFILE.AUTH.REGISTER_EMAIL)
    async registerAccountEmail(
        @Payload() payload: RequestPayload<any, any, any, RegisterEmailAccountBody>,
        @Ack() ctx: RmqContext
    ) {
        const { body } = payload;
        this._logger.log('registerAccountEmail - involked');
        return this._accountService.registerAccountEmail(body);
    }
}

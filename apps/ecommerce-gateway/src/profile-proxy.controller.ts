import { MESSAGE_PATTERN, SERVICES, VERSIONING } from '@libs/common';
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Inject,
    Logger,
    OnApplicationBootstrap,
    Post,
    UseFilters,
    UseGuards,
    UseInterceptors,
    UsePipes
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Public } from '@app/common/decorators/public.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { getMessage } from '@app/common/messages';
import { MainValidationPipe } from '@app/common/pipes/validation.pipe';
import {
    RegisterAccountEmailResponse,
    RegisterAccountEmailResponseDto,
    RegisterEmailAccountBody
} from '@app/common/dto/AccountDto';
import { GatewayHttpExceptionFilter } from '@app/common/filters/gateway-http-exception.filter';
import { BadRequestExceptionFilter } from '@app/common/filters/bad-request.filter';
import { TransformResponseInterceptor } from '@app/common/interceptors/transform-response.interceptor';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
@UseFilters(GatewayHttpExceptionFilter)
@UseFilters(BadRequestExceptionFilter)
@UseInterceptors(TransformResponseInterceptor)
@Controller({ version: VERSIONING.V1 })
export class ProfileProxyController implements OnApplicationBootstrap {
    private readonly _logger = new Logger(ProfileProxyController.name);

    constructor(@Inject(SERVICES.PROFILE) private _client: ClientProxy) {}

    async onApplicationBootstrap() {
        await this._client.connect();
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiTags('Auth')
    @ApiOperation({ summary: 'Register account for customer to login to the mobile app' })
    @ApiOkResponse({ description: getMessage('GENERAL.SUCCESS'), type: RegisterAccountEmailResponseDto })
    @UsePipes(new MainValidationPipe())
    @Post('auth/register-email')
    async registerEmailAccount(@Body() body: RegisterEmailAccountBody) {
        this._logger.log('regisregisterEmailAccountterAccount - send');
        return this._client.send<RegisterAccountEmailResponse>(MESSAGE_PATTERN.PROFILE.AUTH.REGISTER_EMAIL, { body });
    }
}

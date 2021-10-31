import { AccountStatus } from '@app/common';
import { RegisterEmailAccountBody } from '@app/common/dto/AccountDto';
import { MainRepo } from '@app/repositories/main';
import { CachingService } from '@libs/caching';
import { UtilsService } from '@libs/utils';
import { Inject, Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AccountService {
    private readonly _logger = new Logger(AccountService.name);

    constructor(
        private readonly _jwtService: JwtService,
        private readonly _utils: UtilsService,
        private readonly _mainRepo: MainRepo,
        private readonly _caching: CachingService
    ) {}

    async registerAccountEmail(body: RegisterEmailAccountBody) {
        const { email, password } = body;

        const isEmailExist = await this._mainRepo.account.findFirst({ where: { email } });
        if (isEmailExist) {
            throw new UnprocessableEntityException('EMAIL_ALREADY_EXISTS');
        }

        const createdAccount = await this._mainRepo.account.create({
            data: {
                email,
                firstName: '',
                lastName: '',
                fullName: '',
                password: this._utils.hashValue(password),
                status: AccountStatus.NEW
            },
            select: { id: true, email: true }
        });

        return createdAccount;
    }
}

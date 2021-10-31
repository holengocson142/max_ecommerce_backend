import { SOFT_DELETE_MODELS, SortOrder } from '@app/common';
import { UtilsService } from '@app/utils';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { BaseClient } from '../base';

@Injectable()
export class MainRepo extends BaseClient implements OnModuleInit, OnModuleDestroy {
    constructor(private readonly _utils: UtilsService) {
        super();
    }

    onModuleInit() {
        this.useSoftDeleteMiddleware();
        this._client.$connect();
    }

    onModuleDestroy() {
        this._client.$disconnect();
    }

    private useSoftDeleteMiddleware() {
        // Override delete/deleteMany method
        this._client.$use(async (params, next) => {
            if (SOFT_DELETE_MODELS[params.model]) {
                const currentDate = this._utils.getDate().toDate();
                // Check incoming query type
                if (params.action == 'delete') {
                    // Delete queries
                    // Change action to an update
                    params.action = 'update';
                    params.args['data'] = { deletedAt: currentDate };
                }
                if (params.action == 'deleteMany') {
                    // Delete many queries
                    params.action = 'updateMany';
                    if (params.args.data != undefined) {
                        params.args.data['deletedAt'] = currentDate;
                    } else {
                        params.args['data'] = { deletedAt: currentDate };
                    }
                }
            }
            return next(params);
        });
    }

    defaultSort() {
        return { id: SortOrder.asc };
    }

    get account() {
        return this._client.account;
    }
}

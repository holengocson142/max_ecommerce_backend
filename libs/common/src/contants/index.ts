import { Prisma } from '@prisma/client';

export const NANO_ID_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export const NOTIFICATION_TITLE = 'LiveTrade';
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_MAX_PAGE_SIZE = 100;
export const PHONE_NUMBER_LENGTH = 10;

export const SortOrder = Prisma.SortOrder;
export const QueryMode = Prisma.QueryMode;

export const SOFT_DELETE_MODELS = {
    [Prisma.ModelName.Account]: true
};

export const ACCOUNT_CODE_LENGTH = 8;

export enum SERVICES {
    PROFILE = 'PROFILE_SERVICE'
}
export const VALIDATION = {
    DEFAULT_STRING_MIN_LENGTH: 6,
    DEFAULT_STRING_MAX_LENGTH: 255,
    PASSWORD: {
        MIN_LENGTH: 6,
        MAX_LENGTH: 255
    }
};
export const MESSAGE_PATTERN = {
    PROFILE: {
        AUTH: {
            REGISTER_EMAIL: 'register-email',
            LOGIN_EMAIL: 'login-email',
            LOG_OUT: 'logout',
            MY_ACCOUNT: 'my-account',
            UPDATE_PROFILE: 'update-profile',
            SAVE_FCM_TOKEN: 'save-fcm-token',
            REGISTER_PHONE: 'register-phone',
            LOGIN_PHONE: 'login-phone'
        },
        ACCOUNT: {
            ACCOUNT_DETAIL: 'account-detail',
            ACCOUNT_PROPERTY: 'account-property',
            ACCOUNT_WALLET: 'account-wallet',
            ACCOUNT_CHART: 'account-chart'
        }
    }
};

export const VERSIONING = {
    V1: '1'
};

export enum AccountStatus {
    NEW,
    PENDING,
    APPROVED
}

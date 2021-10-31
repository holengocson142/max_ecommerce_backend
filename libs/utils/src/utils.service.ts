import { ACCOUNT_CODE_LENGTH, NANO_ID_ALPHABET } from '@app/common';
import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import { customAlphabet, nanoid } from 'nanoid';

dayjs.extend(utc);

@Injectable()
export class UtilsService {
    /**
     * Convert any phone format to international format
     *
     * Default country is Vietnam
     *
     * @param phone
     * @param defaultCountry
     * @returns The International format
     */
    toIntlPhone(phone: string, defaultCountry: CountryCode = 'VN') {
        return parsePhoneNumber(phone, defaultCountry).formatInternational();
    }

    /**
     * Convert original text to hash text
     *
     * @param text
     * @returns The hash text
     */
    hashValue(text: string) {
        return hashSync(text, genSaltSync(10));
    }

    /**
     * Compare hash
     *
     * @param text
     * @param hashText
     * @returns result
     */
    compareHash(text: string, hashText: string) {
        return compareSync(text, hashText);
    }

    /**
     * Get current timestamp
     *
     * @param isMiliseconds
     * @returns number
     */
    getCurrentTimestamp(options: { isMiliseconds?: boolean; isUTC?: boolean } = {}) {
        const { isMiliseconds = true, isUTC = true } = options;
        const currentDate = isUTC ? dayjs.utc() : dayjs();
        return isMiliseconds ? currentDate.valueOf() : currentDate.unix();
    }

    /**
     * Get date
     *
     * @param date
     * @param isUTC
     * @param format
     * @returns dayjs.Dayjs
     */
    getDate(options: { date?: string | number | Date | dayjs.Dayjs; format?: string; isUTC?: boolean } = {}) {
        const { date, format, isUTC } = options;
        const currentDate = isUTC ? dayjs.utc(date, format) : dayjs(date, format);
        return currentDate;
    }

    /**
     * Get full range date
     *
     * @param from
     * @param to
     * @param defaultCurrentDateOnUndefined
     * @param isUtc
     * @returns [Date, Date]
     */
    getFullRangeDate(options: {
        from?: string | Date;
        to?: string | Date;
        defaultCurrentDateOnUndefined?: boolean;
        isUtc?: boolean;
        typeOfTime?: dayjs.OpUnitType;
    }): [Date, Date] {
        const { from, to, defaultCurrentDateOnUndefined = false, isUtc = true, typeOfTime = 'date' } = options;
        if (defaultCurrentDateOnUndefined) {
            return [
                (isUtc ? dayjs.utc : dayjs)(from).startOf(typeOfTime).toDate(),
                (isUtc ? dayjs.utc : dayjs)(to).endOf(typeOfTime).toDate()
            ];
        }
        return [
            from ? (isUtc ? dayjs.utc : dayjs)(from).startOf(typeOfTime).toDate() : undefined,
            to ? (isUtc ? dayjs.utc : dayjs)(to).endOf(typeOfTime).toDate() : undefined
        ];
    }

    safeCloneObject(object: any) {
        return JSON.parse(JSON.stringify(object));
    }

    formatMoney(money: number) {
        return Intl.NumberFormat().format(money);
    }

    /**
     * Generate an account code
     *
     * @returns string
     */
    generateAccountCode() {
        return this.nanoid()();
    }

    generateUniqueId() {
        return nanoid();
    }

    private nanoid() {
        return customAlphabet(NANO_ID_ALPHABET, ACCOUNT_CODE_LENGTH);
    }

    checkNullProperties(obj) {
        for (const key in obj) {
            if (key !== 'kycExpiredDate') {
                if (obj[key] === null) return false;
            }
        }
        return true;
    }
}

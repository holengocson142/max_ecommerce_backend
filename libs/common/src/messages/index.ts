import * as GENERAL from './general.json';
import * as HTTP_CODE from './httpCode.json';
import * as NOTIFICATION from './notification.json';
import * as VALIDATION from './validation.json';

const messages = { GENERAL, HTTP_CODE, VALIDATION, NOTIFICATION };

const getMessage = (path = '', data?: Record<string, any>) => {
    const messagePaths = path.split('.');
    const message: string = messagePaths?.reduce((prev, curr) => (prev ? prev[curr] : messages[curr]), false);

    if (data && typeof data === 'object' && Object.keys(data).length) {
        return Object.keys(data).reduce((prev, key) => prev.replace(`$${key}`, data[key] || ''), message);
    }

    return message;
};

export { getMessage };

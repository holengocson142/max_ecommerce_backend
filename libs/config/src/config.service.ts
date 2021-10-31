import { SERVICES } from '@libs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';

export class ConfigService {
    private static _instance: ConfigService;

    constructor() {
        config({
            path: '.env'
        });

        // Replace \\n with \n to support multiline strings in AWS
        for (const envName of Object.keys(process.env)) {
            process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
        }
    }

    static getInstance() {
        if (this._instance) return this._instance;
        this._instance = new ConfigService();
        Object.freeze(this._instance);
        return this._instance;
    }

    get isDevelopment(): boolean {
        return this.nodeEnv === 'development';
    }

    get isProduction(): boolean {
        return this.nodeEnv === 'production';
    }

    get nodeEnv(): string {
        return this.get('NODE_ENV') || 'development';
    }

    public get(key: string): string {
        return process.env[key];
    }

    public getNumber(key: string): number {
        return Number(this.get(key));
    }

    public getQueueName(queue: string) {
        const queuePrefix = this.get('SERVICE_QUEUE_PREFIX');
        return `${queuePrefix ? `${queuePrefix}_` : ''}${queue}`;
    }

    public rabbitmqUrls() {
        return this.get('RABBIT_MQ').split(',');
    }

    public profileQueueOptions(): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: this.rabbitmqUrls(),
                queue: this.getQueueName(SERVICES.PROFILE),
                queueOptions: {
                    durablue: true
                },
                noAck: false,
                prefetchCount: this.getNumber('PROFILE_QUEUE_PREFETCH')
            }
        };
    }

    public getMobileJwtConfig(): JwtModuleOptions {
        return {
            secret: this.get('JWT_MOBILE_SECRET_KEY'),
            signOptions: {
                expiresIn: this.getNumber('JWT_MOBILE_EXPIRATION_TIME')
            }
        };
    }
}

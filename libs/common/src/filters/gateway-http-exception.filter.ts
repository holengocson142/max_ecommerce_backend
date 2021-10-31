import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { IExceptionResponse } from '../interfaces';
import { getMessage } from '../messages';

@Catch(HttpException)
export class GatewayHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        // const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse() as IExceptionResponse;
        const { statusCode, message, error } = exceptionResponse;

        response.status(status).json({
            statusCode,
            message: error ? message : getMessage(`HTTP_CODE.${status}`) || error || message
        });
    }
}

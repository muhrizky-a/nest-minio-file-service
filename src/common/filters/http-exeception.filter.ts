import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    UnprocessableEntityException,
    UnauthorizedException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        if (exception instanceof UnprocessableEntityException) {
            const exceptionResponse = exception.getResponse();
            const data = exceptionResponse['data'] ?? null;

            response.status(status).json({
                message: exceptionResponse['message'],
                errors: data,
            });
            return;
        } else if (exception instanceof UnauthorizedException) {
            response.status(status).json({
                message: exception.message ?? 'Not Authorized',
                errors: null,
            });
            return;
        } else if (exception instanceof ForbiddenException) {
            response.status(status).json({
                message: 'Forbidden Access',
                errors: null,
            });
            return;
        } else if (exception instanceof NotFoundException) {
            response.status(404).json({
                message: 'Not Found',
                data: null,
            });
            return;
        } else if (exception instanceof InternalServerErrorException) {
            response.status(status).json({
                message: 'Server Error',
                errors: null,
            });
            return;
        } else if (exception instanceof BadRequestException) {
            response.status(status).json({
                message: exception.message,
                errors: null,
            });
            return;
        }

        response.status(status).json({
            message: exception.getResponse()['message'],
            errors: exception.getResponse()['error'],
        });
    }
}
import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CoreApiResponse } from '../response/api.response';
import { isObject } from 'src/common/utils/is-object-filter';

export const getStatusCode = (exception: unknown): number => {
	return exception instanceof HttpException
		? exception.getStatus()
		: HttpStatus.INTERNAL_SERVER_ERROR;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger('HttpExceptionFilter');

	catch(exception: HttpException | any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();

		if (isObject(exception.response)) {
			exception.response.path = request.path;
			exception.response.method = request.method;
		}

		const statusCode = getStatusCode(exception);

		console.log(statusCode);

		if (statusCode >= 500) {
			this.logger.error(exception);
		}

		response.status(statusCode).json(
			CoreApiResponse.error({
				name: exception?.response?.status,
				message: exception?.response || exception,
			}),
		);
	}
}

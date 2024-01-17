import {
	CanActivate,
	ExecutionContext,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorator/role.decorator';
import { Request } from 'express';
import { CustomHttpError } from '../http/error/custom.error';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector, private jwtService: JwtService) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		);

		const request = context.switchToHttp().getRequest();
		let token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new CustomHttpError({
				message: 'JWT_NOT_PROVIDED',
				statusCode: HttpStatus.UNAUTHORIZED,
			});
		}

		const validUser = this.jwtService.verify(token, {
			secret: process.env.JWT_ACCESS_SECRET,
		});

		if (!validUser) {
			throw new CustomHttpError({
				message: 'LOGIN_FAILED',
				statusCode: HttpStatus.UNAUTHORIZED,
			});
		}

		request.user = validUser;

		return requiredRoles.includes(request.user.role);
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}

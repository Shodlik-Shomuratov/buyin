import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { hash, compare } from 'bcrypt';
import { CustomHttpError } from 'src/common/http/error/custom.error';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async register(dto: RegisterUserDto) {
		try {
			const user = await this.prismaService.user.findFirst({
				where: {
					username: dto.username,
				},
			});

			if (user) {
				throw new CustomHttpError({
					message: 'ALREADY_EXISTS',
					statusCode: HttpStatus.BAD_REQUEST,
				});
			}

			const hashedPassword = await hash(
				dto.password,
				Number(process.env.HASH_SALT_OR_ROUND),
			);

			return await this.prismaService.user.create({
				data: {
					username: dto.username,
					passwordHash: hashedPassword,
				},
				select: {
					id: true,
					username: true,
					createdAt: true,
					updatedAt: true,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async login(dto: LoginUserDto) {
		try {
			const user = await this.prismaService.user.findFirst({
				where: {
					username: dto.username,
				},
			});

			if (!user) {
				throw new CustomHttpError({
					message: 'NOT_FOUND',
					statusCode: HttpStatus.NOT_FOUND,
				});
			}

			const isValidPassword = await compare(
				dto.password,
				user.passwordHash,
			);

			if (!isValidPassword) {
				throw new CustomHttpError({
					message: 'WRONG_PASSWORD',
					statusCode: HttpStatus.BAD_REQUEST,
				});
			}

			const [accessToken, refreshToken] = [
				this.jwtService.sign(
					{
						id: user.id,
						role: Role.USER,
						username: user.username,
					},
					{
						expiresIn: '1h',
						secret: process.env.JWT_ACCESS_SECRET,
					},
				),
				this.jwtService.sign(
					{
						id: user.id,
						role: Role.USER,
						username: user.username,
					},
					{
						expiresIn: '1d',
						secret: process.env.JWT_REFRESH_SECRET,
					},
				),
			];

			await this.prismaService.user.update({
				where: {
					id: user.id,
				},
				data: {
					refreshToken,
				},
			});

			return {
				accessToken,
				refreshToken,
			};
		} catch (error) {
			throw error;
		}
	}

	async findAll() {
		try {
			return await this.prismaService.user.findMany({
				select: {
					id: true,
					username: true,
					createdAt: true,
					updatedAt: true,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async findOne(id: string) {
		try {
			const user = await this.prismaService.user.findFirst({
				where: {
					id,
				},
				select: {
					id: true,
					username: true,
					createdAt: true,
					updatedAt: true,
				},
			});

			if (!user) {
				throw new CustomHttpError({
					message: 'NOT_FOUND',
					statusCode: HttpStatus.NOT_FOUND,
				});
			}

			return user;
		} catch (error) {
			throw error;
		}
	}

	async update(id: string, dto: UpdateUserDto) {
		try {
			const user = await this.prismaService.user.findFirst({
				where: {
					id,
				},
			});

			if (!user) {
				throw new CustomHttpError({
					message: 'NOT_FOUND',
					statusCode: HttpStatus.NOT_FOUND,
				});
			}

			user.username = dto?.username ?? user.username;
			user.passwordHash = dto?.password
				? await hash(dto.password, process.env.HASH_SALT_OR_ROUND)
				: user.passwordHash;

			return await this.prismaService.user.update({
				where: {
					id,
				},
				data: user,
			});
		} catch (error) {
			throw error;
		}
	}

	async remove(id: string) {
		try {
			const user = await this.prismaService.user.findFirst({
				where: {
					id,
				},
			});

			if (!user) {
				throw new CustomHttpError({
					message: 'NOT_FOUND',
					statusCode: HttpStatus.NOT_FOUND,
				});
			}

			return await this.prismaService.user.delete({
				where: {
					id,
				},
			});
		} catch (error) {
			throw error;
		}
	}
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import { RefreshAdminDto } from './dto/refresh-admin.dto';
import { CustomHttpError } from 'src/common/http/error/custom.error';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/enums/role.enum';

const AdminSelect = {
	id: true,
	username: true,
	createdAt: true,
	updatedAt: true,
};

@Injectable()
export class AdminService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async login(dto: LoginAdminDto) {
		try {
			const admin = await this.prismaService.admin.findFirst({
				where: {
					username: dto.username,
				},
			});

			if (!admin) {
				throw new CustomHttpError({
					message: 'WRONG_USERNAME',
					statusCode: HttpStatus.BAD_REQUEST,
				});
			}

			const isValidPassword = compare(dto.password, admin.passwordHash);

			if (!isValidPassword) {
				throw new CustomHttpError({
					message: 'WRONG_PASSWORD',
					statusCode: HttpStatus.BAD_REQUEST,
				});
			}

			const [accessToken, refreshToken] = [
				this.jwtService.sign(
					{
						id: admin.id,
						username: admin.username,
						role: Role.ADMIN,
					},
					{
						secret: process.env.JWT_ACCESS_SECRET,
						expiresIn: '1h',
					},
				),
				this.jwtService.sign(
					{
						id: admin.id,
						username: admin.username,
						role: Role.ADMIN,
					},
					{
						secret: process.env.JWT_REFRESH_SECRET,
						expiresIn: '1d',
					},
				),
			];

			await this.prismaService.admin.update({
				where: {
					id: admin.id,
				},
				data: {
					refreshToken,
				},
			});

			return {
				accessToken,
				refreshToken,
				admin,
			};
		} catch (error) {
			throw error;
		}
	}

	async refresh(dto: RefreshAdminDto) {
		try {
		} catch (error) {
			throw error;
		}
	}

	async create(dto: CreateAdminDto) {
		try {
			const admin = await this.prismaService.admin.findFirst({
				where: {},
			});

			if (admin) {
				throw new CustomHttpError({
					message: 'Username already existed!',
					statusCode: HttpStatus.BAD_REQUEST,
				});
			}

			const hashedPassword = await hash(
				dto.password,
				Number(process.env.HASH_SALT_OR_ROUND),
			);

			return await this.prismaService.admin.create({
				data: {
					username: dto.username,
					passwordHash: hashedPassword,
				},
				select: AdminSelect,
			});
		} catch (error) {
			throw error;
		}
	}

	async findAll() {
		try {
			return await this.prismaService.admin.findMany({
				select: AdminSelect,
			});
		} catch (error) {
			throw error;
		}
	}

	async findOne(id: string) {
		try {
			const admin = await this.prismaService.admin.findFirst({
				where: {
					id,
				},
			});

			if (!admin) {
				throw new CustomHttpError({
					message: 'NOT_FOUND',
					statusCode: HttpStatus.NOT_FOUND,
				});
			}

			return admin;
		} catch (error) {
			throw error;
		}
	}

	async update(id: string, dto: UpdateAdminDto) {
		try {
			const admin = await this.prismaService.admin.findFirst({
				where: {
					id,
				},
			});

			if (!admin) {
				throw new CustomHttpError({
					message: 'NOT_FOUND',
					statusCode: HttpStatus.NOT_FOUND,
				});
			}

			if (dto.username) {
				admin.username = dto.username;
			}

			if (dto.password) {
				admin.passwordHash = await hash(
					dto.password,
					process.env.HASH_SALT_OR_ROUND,
				);
			}

			return await this.prismaService.admin.update({
				data: admin,
				where: {
					id,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async remove(id: string) {
		try {
			const admin = await this.prismaService.admin.findFirst({
				where: {
					id,
				},
			});

			if (!admin) {
				throw new CustomHttpError({
					message: 'NOT_FOUND',
					statusCode: HttpStatus.NOT_FOUND,
				});
			}

			return await this.prismaService.admin.delete({
				where: {
					id,
				},
			});
		} catch (error) {
			throw error;
		}
	}
}

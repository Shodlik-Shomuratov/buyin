import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { PrismaService } from 'src/prisma.service';
import { CustomHttpError } from 'src/common/http/error/custom.error';

@Injectable()
export class BannerService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(dto: CreateBannerDto) {
		try {
			return await this.prismaService.banner.create({
				data: {
					...dto,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async findAll() {
		try {
			return await this.prismaService.banner.findMany();
		} catch (error) {
			throw error;
		}
	}

	async findOne(id: string) {
		try {
			const banner = await this.prismaService.banner.findFirst({
				where: {
					id,
				},
			});

			if (!banner) {
				throw new CustomHttpError({
					message: 'NOT_FOUND',
					statusCode: HttpStatus.NOT_FOUND,
				});
			}

			return banner;
		} catch (error) {
			// if (error.code === 'P2023') {
			// 	console.log(error);
			// 	throw new CustomHttpError({
			// 		message: 'INVALID_ID',
			// 		statusCode: HttpStatus.BAD_REQUEST,
			// 	});
			// }
			throw error;
		}
	}

	async update(id: string, dto: UpdateBannerDto) {
		try {
			const banner = await this.prismaService.banner.findFirst({
				where: {
					id,
				},
			});

			if (!banner) {
				throw new CustomHttpError({
					message: 'NOT_FOUND',
					statusCode: HttpStatus.NOT_FOUND,
				});
			}

			return await this.prismaService.banner.update({
				where: {
					id,
				},
				data: {
					...dto,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async remove(id: string) {
		try {
			const banner = await this.prismaService.banner.findFirst({
				where: {
					id,
				},
			});

			if (!banner) {
				throw new CustomHttpError({
					message: 'NOT_FOUND',
					statusCode: HttpStatus.NOT_FOUND,
				});
			}

			return await this.prismaService.banner.delete({
				where: {
					id,
				},
			});
		} catch (error) {
			throw error;
		}
	}
}

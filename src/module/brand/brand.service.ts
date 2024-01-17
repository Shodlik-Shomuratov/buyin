import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma.service';
import { CustomHttpError } from 'src/common/http/error/custom.error';

@Injectable()
export class BrandService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(dto: CreateBrandDto) {
		try {
		} catch (error) {
			throw error;
		}
	}

	async findAll() {
		try {
			return await this.prismaService.brand.findMany();
		} catch (error) {
			throw error;
		}
	}

	async findOne(id: string) {
		try {
			const brand = await this.prismaService.brand.findFirst({
				where: {
					id,
				},
			});

			if (!brand) {
				throw new CustomHttpError({
					message: 'NOT_FOUND',
					statusCode: HttpStatus.NOT_FOUND,
				});
			}

			return brand;
		} catch (error) {
			throw error;
		}
	}

	async update(id: string, dto: UpdateBrandDto) {
		try {
			const brand = await this.prismaService.brand.findFirst({
				where: {
					id,
				},
			});

			if (!brand) {
				throw new CustomHttpError({
					message: 'NOT_FOUND',
					statusCode: HttpStatus.NOT_FOUND,
				});
			}

			return await this.prismaService.brand.update({
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
			const brand = await this.prismaService.brand.findFirst({
				where: {
					id,
				},
			});

			if (!brand) {
				throw new CustomHttpError({
					message: 'NOT_FOUND',
					statusCode: HttpStatus.NOT_FOUND,
				});
			}

			return await this.prismaService.brand.delete({
				where: {
					id,
				},
			});
		} catch (error) {
			throw error;
		}
	}
}

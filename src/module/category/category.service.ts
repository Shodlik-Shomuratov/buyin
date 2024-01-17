import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
import { CustomHttpError } from 'src/common/http/error/custom.error';

@Injectable()
export class CategoryService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(dto: CreateCategoryDto) {
		try {
			return await this.prismaService.category.create({
				data: {
					name: dto.name,
					imageUrl: dto.imageUrl,
					iconUrl: dto?.iconUrl,
					description: dto?.description,
					parentId: Boolean(dto?.parentId) ? dto?.parentId : null,
				},
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async findAll() {
		try {
			return await this.prismaService.category.findMany({
				include: {
					children: true,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async findOne(id: string) {
		try {
			return await this.prismaService.category.findFirst({
				where: {
					id,
				},
				include: {
					children: true,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async update(id: string, dto: UpdateCategoryDto) {
		try {
			const category = await this.prismaService.category.findFirst({
				where: {
					id,
				},
			});

			if (!category) {
				throw new CustomHttpError({
					message: 'NOT_FOUND',
					statusCode: HttpStatus.NOT_FOUND,
				});
			}

			return await this.prismaService.category.update({
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
			const category = await this.prismaService.category.findFirst({
				where: {
					id,
				},
			});

			if (!category) {
				throw new CustomHttpError({
					message: 'NOT_FOUND',
					statusCode: HttpStatus.NOT_FOUND,
				});
			}

			return await this.prismaService.category.delete({
				where: {
					id,
				},
			});
		} catch (error) {
			throw error;
		}
	}
}

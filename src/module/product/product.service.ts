import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(dto: CreateProductDto) {
		try {
			const product = await this.prismaService.products.findFirst({
				where: {
					title: dto.title,
				},
			});

			if (product) {
				throw new HttpException(
					'TITLE_ALREADY_USED',
					HttpStatus.BAD_REQUEST,
				);
			}

			return await this.prismaService.products.create({
				data: {
					title: dto.title,
					description: dto.description,
					price: dto.price,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async findAll() {
		try {
			return await this.prismaService.products.findMany();
		} catch (error) {
			throw error;
		}
	}

	async findOne(id: string) {
		try {
			const product = await this.prismaService.products.findFirst({
				where: {
					id,
				},
			});

			if (!product) {
				throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
			}

			return product;
		} catch (error) {
			throw error;
		}
	}

	async update(id: string, dto: UpdateProductDto) {
		try {
			const product = await this.prismaService.products.findFirst({
				where: {
					id,
				},
			});

			if (!product) {
				throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
			}
			return await this.prismaService.products.update({
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
			return await this.prismaService.products.delete({
				where: {
					id,
				},
			});
		} catch (error) {
			throw error;
		}
	}
}

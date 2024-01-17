import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CoreApiResponse } from 'src/common/http/response/api.response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PRODUCT')
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	async create(@Body() dto: CreateProductDto) {
		return CoreApiResponse.success(await this.productService.create(dto));
	}

	@Get()
	async findAll() {
		return CoreApiResponse.success(await this.productService.findAll());
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return CoreApiResponse.success(await this.productService.findOne(id));
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateProductDto: UpdateProductDto,
	) {
		return CoreApiResponse.success(
			await this.productService.update(id, updateProductDto),
		);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return CoreApiResponse.success(await this.productService.remove(id));
	}
}

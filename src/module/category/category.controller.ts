import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreApiResponse } from 'src/common/http/response/api.response';

@ApiTags('CATEGORY')
@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@ApiOperation({
		summary: 'Create category',
	})
	async create(@Body() dto: CreateCategoryDto) {
		return CoreApiResponse.success(await this.categoryService.create(dto));
	}

	@Get()
	async findAll() {
		return CoreApiResponse.success(await this.categoryService.findAll());
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return CoreApiResponse.success(await this.categoryService.findOne(id));
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateCategoryDto: UpdateCategoryDto,
	) {
		return CoreApiResponse.success(
			this.categoryService.update(id, updateCategoryDto),
		);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return CoreApiResponse.success(await this.categoryService.remove(id));
	}
}

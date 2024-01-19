import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { CoreApiResponse } from 'src/common/http/response/api.response';

@ApiTags('BANNER')
@Controller('banner')
export class BannerController {
	constructor(private readonly bannerService: BannerService) {}

	@Post()
	@ApiOperation({
		summary: 'Create banner',
	})
	@ApiBearerAuth('JWT')
	@Roles(Role.ADMIN)
	@UseGuards(AuthGuard)
	async create(@Body() dto: CreateBannerDto) {
		return CoreApiResponse.success(await this.bannerService.create(dto));
	}

	@Get()
	@ApiOperation({
		summary: 'Find all banner',
	})
	async findAll() {
		return CoreApiResponse.success(await this.bannerService.findAll());
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Find one banner',
	})
	async findOne(@Param('id') id: string) {
		return this.bannerService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({
		summary: 'Update banner',
	})
	@ApiBearerAuth('JWT')
	@Roles(Role.ADMIN)
	@UseGuards(AuthGuard)
	async update(@Param('id') id: string, @Body() dto: UpdateBannerDto) {
		return CoreApiResponse.success(
			await this.bannerService.update(id, dto),
		);
	}

	@Delete(':id')
	@ApiOperation({
		summary: 'Delete banner',
	})
	@ApiBearerAuth('JWT')
	@Roles(Role.ADMIN)
	@UseGuards(AuthGuard)
	async remove(@Param('id') id: string) {
		return this.bannerService.remove(id);
	}
}

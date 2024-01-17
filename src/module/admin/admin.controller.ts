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
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CoreApiResponse } from 'src/common/http/response/api.response';
import { LoginAdminDto } from './dto/login.dto';
import {
	ApiBearerAuth,
	ApiHeader,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { RefreshAdminDto } from './dto/refresh-admin.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('ADMIN')
@Controller('/admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Post()
	@ApiOperation({
		summary: 'Create admin',
	})
	@ApiBearerAuth('JWT')
	@ApiHeader({ name: 'Authorization', required: false })
	@Roles(Role.ADMIN)
	@UseGuards(AuthGuard)
	async create(@Body() dto: CreateAdminDto) {
		return CoreApiResponse.success(await this.adminService.create(dto));
	}

	@Post('/login')
	@ApiOperation({
		summary: 'Login admin',
	})
	async login(@Body() dto: LoginAdminDto) {
		return CoreApiResponse.success(await this.adminService.login(dto));
	}

	@Post('/refresh')
	@ApiOperation({
		summary: 'Admin refresh token',
	})
	@ApiBearerAuth('JWT')
	@ApiHeader({ name: 'Authorization', required: false })
	@Roles(Role.ADMIN)
	@UseGuards(AuthGuard)
	async refresh(@Body() dto: RefreshAdminDto) {
		return CoreApiResponse.success(await this.adminService.refresh(dto));
	}

	@Get()
	@ApiOperation({
		summary: 'Get all admin',
	})
	@ApiBearerAuth('JWT')
	@ApiHeader({ name: 'Authorization', required: false })
	@Roles(Role.ADMIN)
	@UseGuards(AuthGuard)
	async findAll() {
		return CoreApiResponse.success(await this.adminService.findAll());
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Find an admin',
	})
	@ApiBearerAuth('JWT')
	@ApiHeader({ name: 'Authorization', required: false })
	@Roles(Role.ADMIN)
	@UseGuards(AuthGuard)
	async findOne(@Param('id') id: string) {
		return CoreApiResponse.success(await this.adminService.findOne(id));
	}

	@Patch(':id')
	@ApiOperation({
		summary: 'Update an admin',
	})
	@ApiBearerAuth('JWT')
	@ApiHeader({ name: 'Authorization', required: false })
	@Roles(Role.ADMIN)
	@UseGuards(AuthGuard)
	async update(@Param('id') id: string, @Body() dto: UpdateAdminDto) {
		return CoreApiResponse.success(await this.adminService.update(id, dto));
	}

	@Delete(':id')
	@ApiOperation({
		summary: 'Delete an admin',
	})
	@ApiBearerAuth('JWT')
	@ApiHeader({ name: 'Authorization', required: false })
	@Roles(Role.ADMIN)
	@UseGuards(AuthGuard)
	async remove(@Param('id') id: string) {
		return CoreApiResponse.success(await this.adminService.remove(id));
	}
}

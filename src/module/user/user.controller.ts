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
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { CoreApiResponse } from 'src/common/http/response/api.response';
import { RegisterUserDto } from './dto/register-user.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('USER')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('/login')
	@ApiOperation({
		summary: 'User login',
	})
	async login(@Body() dto: LoginUserDto) {
		return CoreApiResponse.success(await this.userService.login(dto));
	}

	@Post('/register')
	@ApiOperation({
		summary: 'User login',
	})
	async register(@Body() dto: RegisterUserDto) {
		return CoreApiResponse.success(await this.userService.register(dto));
	}

	@Get()
	@ApiOperation({
		summary: 'Find all user',
	})
	@ApiBearerAuth('JWT')
	@Roles(Role.ADMIN, Role.USER)
	@UseGuards(AuthGuard)
	async findAll() {
		return CoreApiResponse.success(await this.userService.findAll());
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Find one user',
	})
	@ApiBearerAuth('JWT')
	@Roles(Role.ADMIN, Role.USER)
	@UseGuards(AuthGuard)
	async findOne(@Param('id') id: string) {
		return CoreApiResponse.success(await this.userService.findOne(id));
	}

	@Patch(':id')
	@ApiOperation({
		summary: 'Update user',
	})
	@ApiBearerAuth('JWT')
	@Roles(Role.ADMIN, Role.USER)
	@UseGuards(AuthGuard)
	async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return CoreApiResponse.success(await this.userService.update(id, dto));
	}

	@Delete(':id')
	@ApiOperation({
		summary: 'Delete user',
	})
	@ApiBearerAuth('JWT')
	@Roles(Role.ADMIN, Role.USER)
	@UseGuards(AuthGuard)
	async remove(@Param('id') id: string) {
		return CoreApiResponse.success(await this.userService.remove(id));
	}
}

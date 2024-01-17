import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginAdminDto {
	@ApiProperty({
		type: String,
		required: true,
		default: 'admin',
	})
	@IsNotEmpty()
	username: string;

	@ApiProperty({
		type: String,
		required: true,
		default: 'admin',
	})
	@IsNotEmpty()
	password: string;
}

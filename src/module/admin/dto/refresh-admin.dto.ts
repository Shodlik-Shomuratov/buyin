import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshAdminDto {
	@ApiProperty({
		type: String,
		required: true,
	})
	@IsNotEmpty()
	refreshToken: string;
}

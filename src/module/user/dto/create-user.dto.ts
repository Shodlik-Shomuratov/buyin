import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({
		type: String,
		required: true,
	})
	@IsNotEmpty()
	username: string;

	@ApiProperty({
		type: String,
		required: true,
	})
	@IsNotEmpty()
	password: string;
}

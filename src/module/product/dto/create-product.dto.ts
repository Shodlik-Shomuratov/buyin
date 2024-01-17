import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
	@ApiProperty({
		type: String,
		required: true,
	})
	@IsNotEmpty()
	title: string;

	@ApiProperty({
		type: String,
		required: true,
	})
	@IsString()
	description: string;

	@ApiProperty({
		type: String,
		required: true,
	})
	@IsString()
	price: string;
}

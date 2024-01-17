import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
	@ApiProperty({
		type: String,
		required: true,
	})
	@IsNotEmpty()
	name: string;

	@ApiPropertyOptional({
		type: String,
	})
	@IsString()
	description: string;

	@ApiPropertyOptional({
		type: String,
	})
	@IsString()
	imageUrl: string;

	@ApiPropertyOptional({
		type: String,
	})
	@IsString()
	iconUrl: string;

	@ApiPropertyOptional({
		type: String,
	})
	@IsOptional()
	parentId: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBannerDto {
	@ApiProperty()
	@IsNotEmpty()
	title: string;

	@ApiPropertyOptional()
	@IsString()
	subtitle: string;

	@ApiPropertyOptional()
	@IsString()
	url: string;

	@ApiPropertyOptional()
	@IsString()
	description: string;

	@ApiPropertyOptional()
	@IsString()
	imageUrl: string;
}

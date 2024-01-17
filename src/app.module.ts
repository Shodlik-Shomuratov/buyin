import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { AdminModule } from './module/admin/admin.module';
import { ProductModule } from './module/product/product.module';
import { CategoryModule } from './module/category/category.module';
import { BannerModule } from './module/banner/banner.module';
import { BrandModule } from './module/brand/brand.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'nestjs-prisma';

@Module({
	imports: [
		JwtModule.register({
			global: true,
		}),
		AdminModule,
		UserModule,
		ProductModule,
		CategoryModule,
		BannerModule,
		BrandModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { options } from './common/swagger/options.swagger';
import { HttpExceptionFilter } from './common/http/exception/filter.exception';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: true,
		bodyParser: true,
	});

	app.setGlobalPrefix('/api');
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	);
	app.useGlobalFilters(new HttpExceptionFilter());
	app.enableShutdownHooks();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('/docs', app, document);

	const port = process.env.PORT || 3001;
	await app.listen(port, () => {
		console.log(`Server listening on port ${port}`);
	});
}
bootstrap();

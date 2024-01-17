import { DocumentBuilder } from '@nestjs/swagger';

export const options = new DocumentBuilder()
	.setTitle('Buyin API')
	.setDescription(
		'Ecommerce API for Buyin Ecomerce \n Username and Password for admin \n username: admin \n password: admin',
	)
	.setVersion('1.0.0')
	.addBearerAuth(
		{
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT',
			description: 'Fill input below with Access Token',
			in: 'header',
		},
		'JWT',
	)
	.build();

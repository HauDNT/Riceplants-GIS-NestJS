import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedService } from "./seed/seed.service";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());

    // Initialize dataSource:
    // await dataSource.initialize()
    //     .then(() => {
    //         console.log("Data Source has been initialized!");
    //     })
    //     .catch((err) => {
    //         console.error("Error during Data Source initialization:", err);
    //     });

    const configService = app.get(ConfigService);

    // Swagger config:
    const config = new DocumentBuilder()
        .setTitle('GIS APIs Documents')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Seeder: 
    // const seedService = app.get(SeedService);
    // await seedService.seed();

    await app.listen(configService.get<number>('port') || 3000);
}
bootstrap();

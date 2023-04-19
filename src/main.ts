import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/storage');
    app.enableCors();
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '5mb', extended: true }));

    const port: string = config.port;
    await app.listen(port);
}
bootstrap();

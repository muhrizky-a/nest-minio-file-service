import { Module } from '@nestjs/common';
import { config } from '../config';
import { MinioModule } from 'nestjs-minio-client';
import { MinioController } from './controllers/minio.controller';
import { MinioClientService } from './services/minio-client.service';
import { MinioUseCase } from './use-case/minio-client.usecase';

@Module({
    imports: [
        MinioModule.register({
            endPoint: config.storage.minio.endPoint,
            port: config.storage.minio.port,
            useSSL: config.storage.minio.isUseSSL,
            accessKey: config.storage.minio.accessKey,
            secretKey: config.storage.minio.secretKey
        }),
    ],
    controllers: [
        MinioController
    ],
    providers: [
        MinioUseCase,
        MinioClientService
    ],
})
export class ApplicationModule { }
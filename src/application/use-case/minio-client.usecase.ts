import { Injectable, NotFoundException } from '@nestjs/common';
import { BucketItemFromList } from 'minio';
import { CreateBucketV1Request } from '../requests/v1/minio/create-bucket-v1.request';
import { MinioClientService } from '../services/minio-client.service';

@Injectable()
export class MinioUseCase {
    constructor(
        private readonly minioClientService: MinioClientService,
    ) { }

    async makeBucket(request: CreateBucketV1Request): Promise<Object> {
        return await this.minioClientService.makeBucket(request);
    }

    async isBucketExists(bucketName: string): Promise<boolean> {
        const exists = await this.minioClientService.isBucketExists(bucketName);
        if (!exists) throw new NotFoundException("Bucket Not Found");
        return true;
    }

    async listAllBuckets(): Promise<BucketItemFromList[]> {
        return await this.minioClientService.listAllBuckets();
    }

    async upload(
        file: Express.Multer.File,
    ): Promise<String> {
        return await this.minioClientService.upload(file);
    }
}

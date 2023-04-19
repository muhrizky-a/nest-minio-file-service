import { Injectable } from '@nestjs/common';
import { BucketItemFromList } from 'minio';
import { MinioClientService } from '../services/minio-client.service';

@Injectable()
export class MinioUseCase {
    constructor(
        private readonly minioClientService: MinioClientService,
    ) { }

    async test(): Promise<String> {
        return await this.minioClientService.test();
    }

    async listAllBuckets(): Promise<BucketItemFromList[]> {
        return await this.minioClientService.listAllBuckets();
    }
}

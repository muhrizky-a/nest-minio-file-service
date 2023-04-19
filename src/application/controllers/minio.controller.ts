import { Controller, Get, Post } from '@nestjs/common';
import { BucketItemFromList } from 'minio';
import { MinioUseCase } from '../use-case/minio-client.usecase';

@Controller('minio')
export class MinioController {
  constructor(private readonly minioUseCase: MinioUseCase) { }

  @Get('buckets')
  async listAllBuckets(
  ): Promise<Object> {
    const data = await this.minioUseCase.test();

    return {
      message: 'OK',
      data
    };
  }
}

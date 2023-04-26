import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBucketV1Request } from '../requests/v1/minio/create-bucket-v1.request';
import { MinioUseCase } from '../use-case/minio-client.usecase';

@Controller('minio')
export class MinioController {
  constructor(private readonly minioUseCase: MinioUseCase) { }

  // TODO: Fix create bucket
  // Controller hasn't worked yet
  @Post('buckets')
  async makeBucket(
    @Body() request: CreateBucketV1Request,
  ): Promise<Object> {
    const data = await this.minioUseCase.makeBucket(request);

    return {
      message: 'OK',
      data
    };
  }

  @Get('buckets')
  async listAllBuckets(): Promise<Object> {
    const data = await this.minioUseCase.listAllBuckets();

    return {
      message: 'OK',
      data
    };
  }

  @Get('buckets/:bucketName')
  async isBucketExists(
    @Param('bucketName') bucketName: string,
  ): Promise<Object> {
    const data = await this.minioUseCase.isBucketExists(bucketName);

    return {
      message: 'OK',
      data: {
        status: data
      }
    };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Object> {
    const data = await this.minioUseCase.upload(file);

    return {
      message: 'OK',
      data
    };
  }
}

import { Injectable } from '@nestjs/common';
import { BucketItemFromList, Client } from 'minio';
import { MinioService } from 'nestjs-minio-client';
import { config } from 'src/config';
import { CreateBucketV1Request } from '../requests/v1/minio/create-bucket-v1.request';

@Injectable()
export class MinioClientService {
  constructor(private readonly minioService: MinioService) { }

  async makeBucket(data: CreateBucketV1Request): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.minioService.client.makeBucket(
        data.bucketName,
        data.region,
        function (err) {
          if (err) reject(err)
          resolve({
            bucketName: data.bucketName,
            region: data.region,
          });
        });
    });
  }

  async isBucketExists(bucketName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.minioService.client.bucketExists(bucketName, function (err, exists) {
        if (err) reject(err);
        resolve(exists);
      });
    })
  }

  async listAllBuckets(): Promise<BucketItemFromList[]> {
    return this.minioService.client.listBuckets();
  }

  async upload(file: Express.Multer.File): Promise<String> {
    const metaData = {
      'Content-Type': 'application/octet-stream',
    };

    const fileName = file.originalname;
    const destinationPath = config.storage.path.replace("./", "") + '/' + fileName;
    const filePath = '/' + fileName;

    // Using fPutObject API upload your file to the bucket europetrip.
    this.minioService.client.fPutObject(
      config.storage.minio.bucketName,
      destinationPath,
      filePath,
      metaData,
      function (err, etag) {
        if (err) return console.log(err);
        console.log('File uploaded successfully.' + etag);
      },
    );

    const publicLink =
      config.storage.minio.host +
      '/' +
      config.storage.minio.bucketName +
      '/' +
      filePath;

    return publicLink;
  }
}

import { Injectable } from '@nestjs/common';
import { BucketItemFromList, Client } from 'minio';
import { MinioService } from 'nestjs-minio-client';
import { config } from 'src/config';

@Injectable()
export class MinioClientService {
  constructor(private readonly minioService: MinioService) { }

  async test(): Promise<String> {
    const minioClient = new Client({
      endPoint: config.storage.minio.endPoint,
      port: config.storage.minio.port,
      useSSL: config.storage.minio.isUseSSL,
      accessKey: config.storage.minio.accessKey,
      secretKey: config.storage.minio.secretKey,
    });

    const metaData = {
      'Content-Type': 'application/octet-stream',
    };

    const fileDestPath = 'world.jpg';
    const fileOriginalRelativePath = config.storage.path + '/' + fileDestPath;

    // Using fPutObject API upload your file to the bucket europetrip.
    minioClient.fPutObject(
      config.storage.minio.bucketName,
      fileDestPath,
      fileOriginalRelativePath,
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
      fileDestPath;

    return publicLink;
  }

  async listAllBuckets(): Promise<BucketItemFromList[]> {
    return this.minioService.client.listBuckets();
  }

  // async upload(): Promise<void> {
  //   // File that needs to be uploaded.
  //   var file = '/tmp/photos-europe.tar'

  //   // Make a bucket called europetrip.
  //   this.minioClient.makeBucket('europetrip', 'us-east-1', function (err) {
  //     if (err) return console.log(err)

  //     console.log('Bucket created successfully in "us-east-1".')

  //     var metaData = {
  //       'Content-Type': 'application/octet-stream',
  //       'X-Amz-Meta-Testing': 1234,
  //       'example': 5678
  //     }
  //     // Using fPutObject API upload your file to the bucket europetrip.
  //     this.minioClient.fPutObject('europetrip', 'photos-europe.tar', file, metaData, function (err, etag) {
  //       if (err) return console.log(err)
  //       console.log('File uploaded successfully.')
  //     });
  //   });
  // }
}

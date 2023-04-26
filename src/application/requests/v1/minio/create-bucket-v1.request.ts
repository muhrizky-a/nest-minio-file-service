import { Expose } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class CreateBucketV1Request {
    @IsNotEmpty({ message: 'Nama Bucket tidak dapat kosong' })
    @IsString({ message: 'Nama Bucket harus merupakan huruf' })
    @Expose({ name: 'bucket_name' })
    bucketName: string;

    @IsNotEmpty({ message: 'Region tidak dapat kosong' })
    @IsString({ message: 'Region harus merupakan huruf' })
    @Expose({ name: 'region' })
    region: string;
}
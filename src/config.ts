// eslint-disable-next-line
import * as process from 'process';

const dotenv = require('dotenv');
dotenv.config();

export const config = {
    /**
     * server configuration
     */
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT || '3000',

    /**
     * storage configuration for file uploads
     */
    storage: {
        s3: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            defaultRegion: process.env.AWS_DEFAULT_REGION,
            bucketName: process.env.AWS_BUCKET_NAME,
        },
        minio: {
            host: process.env.MINIO_HOST,
            endPoint: process.env.MINIO_ENDPOINT,
            bucketName: process.env.MINIO_BUCKET_NAME,
            port: Number.parseInt(process.env.MINIO_PORT),
            isUseSSL: process.env.MINIO_IS_USE_SSL == 'true' || false,
            accessKey: process.env.MINIO_ACCESS_KEY,
            secretKey:
                process.env.MINIO_SECRET_KEY,
        },
        gcs: {
            projectId: process.env.GCS_PROJECT_ID,
            pathKeyFileJson: process.env.GCS_PATH_KEY_FILE_JSON,
            bucketName: process.env.GCS_BUCKET_NAME || 'bucket-name',
            url: process.env.GCS_PUBLIC_URL || 'https://storage.googleapis.com',
        },
        path: './storages',
    },
};

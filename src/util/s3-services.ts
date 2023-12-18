import * as dotenv from 'dotenv';
dotenv.config();

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY,
  },
});
const bucketName = process.env.BUCKET_AWS;

export async function uploadToS3(data: any, path: string) {
  const params = {
    Bucket: bucketName,
    Key: './' + path,
    Body: data,
  };

  const result = await s3.send(new PutObjectCommand(params));
  return result;
}

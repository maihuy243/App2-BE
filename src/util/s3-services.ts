import * as dotenv from 'dotenv';
dotenv.config();
import { S3 } from 'aws-sdk';
import { Constant } from 'src/config/Constant';

const bucketName = process.env.BUCKET_AWS;
const PREFIX_BASE = Constant.PREFIX_BASE;
const EXPIRES_URL = Constant.EXPIRES_URL_S3;

export async function uploadToS3(data: any, prefix: string) {
  const s3 = new S3();
  const params = {
    Bucket: bucketName,
    Key: PREFIX_BASE + prefix,
    Body: data,
  };

  return new Promise((res, rej) => {
    s3.putObject(params, (err) => {
      if (err) {
        rej('upload file faild !');
      } else res('upload file success');
    });
  });
}

export async function getObjectS3(prefix: string) {
  const s3 = new S3();

  const params = {
    Bucket: bucketName,
    Key: PREFIX_BASE + prefix,
  };

  return new Promise((res, rej) => {
    s3.getObject(params, (err, data) => {
      if (err) {
        rej('Get Object Faild in --- ' + PREFIX_BASE + prefix);
      } else {
        res(data.Body);
      }
    });
  });
}

export async function getUrlFromS3(prefix: string) {
  const s3 = new S3();

  const params = {
    Bucket: bucketName,
    Key: PREFIX_BASE + prefix,
    Expires: EXPIRES_URL,
  };

  return new Promise((res, rej) => {
    s3.getSignedUrl('getObject', params, function (err, url) {
      if (err) rej(err);
      res(url);
    });
  });
}

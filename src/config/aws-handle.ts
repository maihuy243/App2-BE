import * as AWS from 'aws-sdk';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new AWS.S3();
const bucketName = process.env.BUCKET_AWS;

export function uploadToS3(data: any, path: string) {
  let success: boolean = false;
  const params = {
    Bucket: bucketName,
    Key: path,
    Body: data,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading file to S3:', err);
      success = false;
    } else {
      console.log('File uploaded successfully. S3 Location:', data.Location);
      success = true;
    }
  });
  return success;
}

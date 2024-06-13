import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

const streamToString = async (stream: ReadableStream): Promise<string> => {
  const reader = stream.getReader();
  const utf8Decoder = new TextDecoder('utf-8');
  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += utf8Decoder.decode(value, { stream: true });
  }

  result += utf8Decoder.decode();
  return result;
};

export const getCacheFromS3 = async (key: string): Promise<Record<string, boolean>> => {
  try {
    const params = { Bucket: BUCKET_NAME!, Key: key };
    const command = new GetObjectCommand(params);
    const data = await s3Client.send(command);

    const bodyContents = await streamToString(data.Body as ReadableStream);
    return JSON.parse(bodyContents);
  } catch (error) {
    console.error('Error getting cache from S3:', error);
    return {};
  }
};

export const saveCacheToS3 = async (key: string, cache: Record<string, boolean>): Promise<void> => {
  try {
    const params = {
      Bucket: BUCKET_NAME!,
      Key: key,
      Body: JSON.stringify(cache),
      ContentType: 'application/json',
    };
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
  } catch (error) {
    console.error('Error saving cache to S3:', error);
  }
};

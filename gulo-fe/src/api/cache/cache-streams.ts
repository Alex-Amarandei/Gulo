import { StreamCacheData } from '@/interfaces/graph';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { toast } from 'sonner';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

const streamToString = async (stream: ReadableStream<Uint8Array>): Promise<string> => {
  const reader = stream.getReader();
  const utf8Decoder = new TextDecoder('utf-8');
  let result = '';
  let keepReading = true;

  while (keepReading) {
    const { done, value } = await reader.read();
    if (done) {
      keepReading = false;
      break;
    }
    result += utf8Decoder.decode(value, { stream: true });
  }

  result += utf8Decoder.decode(); // end of stream
  return result;
};

export const getCacheFromS3 = async (key: string): Promise<StreamCacheData> => {
  try {
    const params = { Bucket: BUCKET_NAME!, Key: key };
    const command = new GetObjectCommand(params);
    const data = await s3Client.send(command);

    const bodyContents = await streamToString(data.Body as ReadableStream<Uint8Array>);
    return JSON.parse(bodyContents);
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'NoSuchKey') {
      await saveCacheToS3(key, { count: 0, streams: [] });
      return { count: 0, streams: [] };
    }
    toast.error('Error getting cache from S3: ' + error);
    return { count: 0, streams: [] };
  }
};

export const saveCacheToS3 = async (key: string, cache: StreamCacheData): Promise<void> => {
  try {
    const params = {
      Bucket: BUCKET_NAME!,
      Key: key,
      Body: JSON.stringify(cache),
      ContentType: 'application/json',
    };
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
  } catch (error: unknown) {
    toast.error('Error getting cache from S3: ' + error);
  }
};

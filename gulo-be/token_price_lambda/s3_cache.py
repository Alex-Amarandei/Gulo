import os
import boto3
import logging

aws_access_key_id = os.getenv("ACCESS_KEY_ID")
aws_secret_access_key = os.getenv("SECRET_ACCESS_KEY")
s3_region = os.getenv("S3_REGION", "eu-central-1")

s3_client = boto3.client(
    "s3",
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=s3_region,
)

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def get_token_price_from_s3(bucket_name, key):
    try:
        logger.info(f"Fetching {key} from bucket {bucket_name}")
        response = s3_client.get_object(Bucket=bucket_name, Key=key)
        token_price = response["Body"].read().decode("utf-8")
        logger.info(f"Fetched price from S3: {token_price}")
        return token_price
    except s3_client.exceptions.NoSuchKey:
        logger.warning(f"{key} not found in bucket {bucket_name}")
        return None
    except Exception as e:
        logger.error(f"Error fetching {key} from bucket {bucket_name}: {str(e)}")
        return None


def save_token_price_to_s3(bucket_name, key, token_price):
    try:
        logger.info(f"Saving {key} to bucket {bucket_name} with price {token_price}")
        s3_client.put_object(Bucket=bucket_name, Key=key, Body=str(token_price))
        logger.info(f"Saved price {token_price} to S3 at {key}")
    except Exception as e:
        logger.error(f"Error saving {key} to bucket {bucket_name}: {str(e)}")

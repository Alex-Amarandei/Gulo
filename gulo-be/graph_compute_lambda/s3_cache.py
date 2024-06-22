import os
import json
import boto3
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

aws_access_key_id = os.getenv("ACCESS_KEY_ID")
aws_secret_access_key = os.getenv("SECRET_ACCESS_KEY")
s3_region = os.getenv("S3_REGION", "eu-central-1")

s3_client = boto3.client(
    "s3",
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=s3_region,
)


def get_cache_from_s3(key):
    try:
        response = s3_client.get_object(Bucket=os.environ["S3_BUCKET_NAME"], Key=key)
        return json.loads(response["Body"].read().decode("utf-8"))
    except s3_client.exceptions.NoSuchKey:
        logger.info("No cache found for key: %s", key)
        return {
            "count": 0,
            "streams": [],
        }
    except Exception as e:
        logger.error("Error fetching cache from S3: %s", e)
        raise


def save_cache_to_s3(key, data):
    try:
        s3_client.put_object(
            Bucket=os.environ["S3_BUCKET_NAME"], Key=key, Body=json.dumps(data)
        )
        logger.info("Cache saved to S3 at key: %s", key)
    except Exception as e:
        logger.error("Error saving cache to S3: %s", e)
        raise

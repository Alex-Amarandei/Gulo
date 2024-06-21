import os
import json
import boto3
import logging
from botocore.exceptions import ClientError
from trigger import trigger_graph_compute_lambda

logger = logging.getLogger()
logger.setLevel(logging.INFO)

aws_access_key_id = os.getenv("ACCESS_KEY_ID")
aws_secret_access_key = os.getenv("SECRET_ACCESS_KEY")
s3_region = os.getenv("S3_REGION", "eu-central-1")

if aws_access_key_id and aws_secret_access_key:
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        region_name=s3_region,
    )
    lambda_client = boto3.client(
        "lambda",
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        region_name=s3_region,
    )
else:
    s3_client = boto3.client("s3", region_name=s3_region)
    lambda_client = boto3.client("lambda", region_name=s3_region)

BUCKET_NAME = os.environ["S3_BUCKET_NAME"]
GRAPH_COMPUTE_LAMBDA_NAME = os.environ["GRAPH_COMPUTE_LAMBDA_NAME"]


def lambda_handler(event, context):
    logger.info("Event: %s", json.dumps(event))
    chain_id = event.get("queryStringParameters", {}).get("chainId")
    endpoint = event.get("queryStringParameters", {}).get("endpoint")

    if not chain_id or not endpoint:
        logger.error(
            "Missing required query parameters: chainId=%s, endpoint=%s",
            chain_id,
            endpoint,
        )
        return {
            "statusCode": 400,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
            },
            "body": json.dumps({"error": "Missing required query parameters"}),
        }

    s3_key = f"streams/{chain_id}/graph.json"
    logger.info("Fetching S3 object from key: %s", s3_key)
    payload = {"chainId": chain_id, "endpoint": endpoint, "streamCount": 0}

    try:
        s3_response = s3_client.get_object(Bucket=BUCKET_NAME, Key=s3_key)
        graph_data = json.loads(s3_response["Body"].read().decode("utf-8"))
        logger.info("Successfully fetched S3 object: %s", s3_key)
    except ClientError as e:
        logger.error("Error fetching S3 object: %s", e)
        if e.response["Error"]["Code"] == "NoSuchKey":
            logger.info("No cache found, triggering graph-compute-lambda synchronously")
            response = trigger_graph_compute_lambda(
                lambda_client, GRAPH_COMPUTE_LAMBDA_NAME, payload, sync=True
            )
            logger.info("Synchronous response from graph-compute-lambda received.")
            return {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                },
                "body": response["body"],
            }
        else:
            logger.error("Internal Server Error: %s", e)
            response = trigger_graph_compute_lambda(
                lambda_client, GRAPH_COMPUTE_LAMBDA_NAME, payload, sync=False
            )
            return {
                "statusCode": 500,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                },
                "body": json.dumps({"error": "Internal Server Error"}),
            }

    stream_count = graph_data.get("streamCount", 0)
    payload["streamCount"] = stream_count
    logger.info("Stream count: %d", stream_count)

    if stream_count == 0:
        logger.info("Stream count is 0, triggering graph-compute-lambda synchronously")
        response = trigger_graph_compute_lambda(
            lambda_client, GRAPH_COMPUTE_LAMBDA_NAME, payload, sync=True
        )
        logger.info("Synchronous response from graph-compute-lambda received.")
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
            },
            "body": response["body"],
        }
    else:
        logger.info(
            "Stream count is greater than 0, triggering graph-compute-lambda asynchronously"
        )
        trigger_graph_compute_lambda(
            lambda_client, GRAPH_COMPUTE_LAMBDA_NAME, payload, sync=False
        )

    logger.info("Execution completed successfully!")
    try:
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
            },
            "body": json.dumps(graph_data),
        }
    except Exception as e:
        logger.error("Error serializing response: %s", e)
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
            },
            "body": json.dumps({"error": "Internal Server Error"}),
        }

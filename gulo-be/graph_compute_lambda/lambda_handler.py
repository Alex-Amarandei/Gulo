import os
import json
import logging
from compute_graph import compute_graph

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    try:
        logger.info("Received event")

        chain_id = event.get("chainId", "1")
        endpoint = event.get("endpoint", "")
        skip = event.get("skip", 0)
        logger.info(f"Chain ID: {chain_id}, Endpoint: {endpoint}, Skip: {skip}")

        result = compute_graph(chain_id, endpoint, skip)

        is_async_invocation = event.get("invocationType") == "Event"
        logger.info(
            f"Invocation type is {'asynchronous' if is_async_invocation else 'synchronous'}"
        )

        if is_async_invocation:
            logger.info("Asynchronous invocation, returning 202 status")
            return {
                "statusCode": 202,
                "body": json.dumps({"message": "Cache update initiated."}),
            }

        logger.info("Synchronous invocation, returning computed graph data")
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            "body": json.dumps(result),
        }
    except Exception as e:
        logger.error("Error in compute lambda: %s", e)
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            "body": json.dumps({"error": "Internal Server Error"}),
        }

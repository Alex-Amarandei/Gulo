import logging
from compute_graph import compute_graph
from utils import create_response

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

        response_body = {
            "status": "success",
            "data": (
                result
                if not is_async_invocation
                else {"message": "Cache update initiated."}
            ),
        }

        status_code = 202 if is_async_invocation else 200
        return create_response(status_code, response_body)
    except Exception as e:
        logger.error("Error in compute lambda: %s", e)
        return create_response(500, {"status": "error", "message": str(e)})

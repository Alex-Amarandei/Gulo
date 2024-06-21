import json
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def trigger_graph_compute_lambda(lambda_client, lambda_name, payload, sync):
    invocation_type = "RequestResponse" if sync else "Event"
    logger.info(
        f"Invoking Lambda function: {lambda_name} with payload: {json.dumps(payload)} and invocation type: {invocation_type}",
    )

    try:
        response = lambda_client.invoke(
            FunctionName=lambda_name,
            InvocationType=invocation_type,
            Payload=json.dumps(payload),
        )
        logger.info("Lambda function %s invoked successfully.", lambda_name)

        if sync:
            response_payload = json.loads(response["Payload"].read().decode("utf-8"))
            logger.info(
                f"Synchronous response from Lambda function {lambda_name}",
            )
            return response_payload

    except Exception as e:
        logger.error("Error invoking Lambda function %s: %s", lambda_name, e)
        return None

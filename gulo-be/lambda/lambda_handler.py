import json
from request_handler import handle_post_request


def lambda_handler(event, context):
    method = event["requestContext"]["http"]["method"]

    if method == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        }

    if method != "POST":
        return {
            "statusCode": 405,
            "body": json.dumps({"message": "Method Not Allowed"}),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        }

    body_str = event.get("body", "")
    body_json = json.loads(body_str)
    download_type = body_json.get("downloadType", "")
    response = handle_post_request(body_str, download_type)

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if "headers" not in response:
        response["headers"] = {}

    response["headers"].update(cors_headers)

    return response

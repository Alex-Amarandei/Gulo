import json


def handle_json(body_json):
    file_content = json.dumps(body_json, indent=2)
    response_body = {"fileContent": file_content}
    return {
        "statusCode": 200,
        "body": json.dumps(response_body),
        "headers": {
            "Content-Type": "application/json",
        },
    }

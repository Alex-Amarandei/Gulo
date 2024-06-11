import json


def handle_json(body_json):
    return {
        "statusCode": 200,
        "body": json.dumps(body_json, indent=2),
        "headers": {
            "Content-Type": "application/json",
        },
    }

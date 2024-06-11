import json


def handle_csv(body_json):
    return {
        "statusCode": 501,
        "body": json.dumps({"message": "CSV download not implemented yet."}),
        "headers": {
            "Content-Type": "application/json",
        },
    }

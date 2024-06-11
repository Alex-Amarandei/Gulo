import json


def handle_pdf(body_json):
    return {
        "statusCode": 501,
        "body": json.dumps({"message": "PDF download not implemented yet."}),
        "headers": {
            "Content-Type": "application/json",
        },
    }

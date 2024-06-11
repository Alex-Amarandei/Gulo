import json


def handle_xlsx(body_json):
    return {
        "statusCode": 501,
        "body": json.dumps({"message": "XLSX download not implemented yet."}),
        "headers": {"Content-Type": "application/json"},
    }

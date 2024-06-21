import json
from handlers.json_handler import handle_json
from handlers.csv_handler import handle_csv
from handlers.xlsx_handler import handle_xlsx


def handle_post_request(body_str, download_type):
    body_json = json.loads(body_str)
    handlers = {
        "JSON": handle_json,
        "CSV": handle_csv,
        "XLSX": handle_xlsx,
    }

    handler = handlers.get(download_type)
    if not handler:
        return {
            "statusCode": 400,
            "body": json.dumps(
                {"message": f"Unsupported download type: {download_type}"}
            ),
            "headers": {"Content-Type": "application/json"},
        }

    return handler(body_json)

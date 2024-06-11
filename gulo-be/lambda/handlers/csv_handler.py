import csv
import json
from io import StringIO
import base64


def handle_csv(body_json):
    balance_type = body_json.get("balanceType", "Actual")
    streams = body_json.get("streams", [])

    output = StringIO()
    writer = csv.writer(output)

    if balance_type == "Actual":
        writer.writerow(["Alias", "Asset", "Streamed Amount", "From", "To"])
        for stream in streams:
            alias = stream.get("alias", "")
            asset = stream.get("asset", "")
            streamed_amount = stream.get("streamedAmount", 0)
            sender = stream.get("from", "")
            recipient = stream.get("to", "")
            writer.writerow([alias, asset, streamed_amount, sender, recipient])
    else:  # Forecast
        writer.writerow(
            ["Alias", "Asset", "Current Amount", "Forecast Amount", "From", "To"]
        )
        for stream in streams:
            alias = stream.get("alias", "")
            asset = stream.get("asset", "")
            current_amount = stream.get("currentAmount", 0)
            forecast_amount = stream.get("forecastAmount", 0)
            sender = stream.get("from", "")
            recipient = stream.get("to", "")
            writer.writerow(
                [alias, asset, current_amount, forecast_amount, sender, recipient]
            )

    csv_content = output.getvalue()
    output.close()

    csv_base64 = base64.b64encode(csv_content.encode()).decode()

    return {
        "statusCode": 200,
        "body": json.dumps({"fileContent": csv_base64}),
        "headers": {
            "Content-Type": "application/json",
        },
    }

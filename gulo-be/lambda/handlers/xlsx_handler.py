import xlsxwriter
import json
from io import BytesIO
import base64


def handle_excel(body_json):
    balance_type = body_json.get("balanceType", "Actual")
    streams = body_json.get("streams", [])

    output = BytesIO()
    workbook = xlsxwriter.Workbook(output, {"in_memory": True})
    worksheet = workbook.add_worksheet()

    if balance_type == "Actual":
        headers = ["Alias", "Asset", "Streamed Amount", "From", "To"]
    else:  # Forecast
        headers = ["Alias", "Asset", "Current Amount", "Forecast Amount", "From", "To"]

    for col_num, header in enumerate(headers):
        worksheet.write(0, col_num, header)

    for row_num, stream in enumerate(streams, 1):
        if balance_type == "Actual":
            row = [
                stream.get("alias", ""),
                stream.get("asset", ""),
                stream.get("streamedAmount", 0),
                stream.get("from", ""),
                stream.get("to", ""),
            ]
        else:  # Forecast
            row = [
                stream.get("alias", ""),
                stream.get("asset", ""),
                stream.get("currentAmount", 0),
                stream.get("forecastAmount", 0),
                stream.get("from", ""),
                stream.get("to", ""),
            ]
        for col_num, cell_value in enumerate(row):
            worksheet.write(row_num, col_num, cell_value)

    workbook.close()
    excel_content = output.getvalue()
    output.close()

    excel_base64 = base64.b64encode(excel_content).decode()

    return {
        "statusCode": 200,
        "body": json.dumps({"fileContent": excel_base64}),
        "headers": {
            "Content-Type": "application/json",
        },
    }

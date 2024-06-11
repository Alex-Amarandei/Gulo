import xlsxwriter
import json
from io import BytesIO
import base64


def handle_xlsx(body_json):
    balance_type = body_json.get("balanceType", "Actual")
    streams = body_json.get("streams", [])

    output = BytesIO()
    workbook = xlsxwriter.Workbook(output, {"in_memory": True})
    worksheet_name = f"Gulo - {balance_type}"
    worksheet = workbook.add_worksheet(worksheet_name)

    header_format = workbook.add_format(
        {
            "bold": True,
            "align": "center",
            "bg_color": "#374151",
            "font_color": "#F1F5F9",
        }
    )
    cell_format = workbook.add_format(
        {
            "bg_color": "#1F2937",
            "font_color": "#F1F5F9",
            "num_format": "$#,##0.00",
        }
    )
    first_column_format = workbook.add_format(
        {"bold": True, "font_color": "#F1F5F9", "bg_color": "#1F2937"}
    )
    total_format = workbook.add_format(
        {
            "bold": True,
            "bg_color": "#374151",
            "font_color": "#F1F5F9",
            "align": "right",
            "num_format": "$#,##0.00",
        }
    )
    yes_format = workbook.add_format(
        {"bold": True, "bg_color": "#1F2937", "font_color": "#f77725"}
    )
    no_format = workbook.add_format(
        {"bold": True, "bg_color": "#1F2937", "font_color": "#F1F5F9"}
    )

    if balance_type == "Actual":
        headers = ["Alias", "Asset", "Streamed Amount", "From", "To"]
    else:  # Forecast
        headers = [
            "Alias",
            "Asset",
            "Current Amount",
            "Forecast Amount",
            "Sure",
            "From",
            "To",
        ]

    for col_num, header in enumerate(headers):
        worksheet.write(0, col_num, header, header_format)

    column_widths = [len(header) for header in headers]

    for row_num, stream in enumerate(streams, 1):
        if balance_type == "Actual":
            row = [
                stream.get("alias", ""),
                stream.get("asset", ""),
                float(
                    str(stream.get("streamedAmount", 0))
                    .replace("$", "")
                    .replace(",", "")
                ),
                stream.get("from", ""),
                stream.get("to", ""),
            ]
        else:  # Forecast
            row = [
                stream.get("alias", ""),
                stream.get("asset", ""),
                float(
                    str(stream.get("currentAmount", 0))
                    .replace("$", "")
                    .replace(",", "")
                ),
                float(
                    str(stream.get("forecastAmount", 0))
                    .replace("$", "")
                    .replace(",", "")
                ),
                "Yes" if stream.get("sure", False) else "No",
                stream.get("from", ""),
                stream.get("to", ""),
            ]
        for col_num, cell_value in enumerate(row):
            if col_num == 0:
                hyperlink_format = workbook.add_format(
                    {
                        "bold": True,
                        "font_color": stream.get("color", "#000000"),
                        "bg_color": "#1F2937",
                        "underline": 1,
                    }
                )
                url = f"https://app.sablier.com/stream/{stream.get('alias', '')}"
                worksheet.write_url(
                    row_num,
                    col_num,
                    url,
                    hyperlink_format,
                    string=stream.get("alias", ""),
                )
            elif col_num == 4 and balance_type == "Forecast":
                sure_format = yes_format if cell_value == "Yes" else no_format
                worksheet.write(row_num, col_num, cell_value, sure_format)
            elif col_num in (2, 3):
                worksheet.write(row_num, col_num, cell_value, cell_format)
            else:
                worksheet.write(row_num, col_num, cell_value, cell_format)
            column_widths[col_num] = max(column_widths[col_num], len(str(cell_value)))

    total_row_num = len(streams) + 1
    worksheet.write(total_row_num, 0, "Total", total_format)
    if balance_type == "Actual":
        total_formula = f"=SUM(C2:C{total_row_num})"
        worksheet.write(total_row_num, 2, total_formula, total_format)
    else:  # Forecast
        current_total_formula = f"=SUM(C2:C{total_row_num})"
        forecast_total_formula = f"=SUM(D2:D{total_row_num})"
        worksheet.write(total_row_num, 2, current_total_formula, total_format)
        worksheet.write(total_row_num, 3, forecast_total_formula, total_format)

    for col_num in range(len(headers)):
        if (
            col_num not in (0, 2, 3, 4)
            or (balance_type == "Actual" and col_num != 2)
            or (balance_type == "Forecast" and col_num not in (2, 3, 4))
        ):
            worksheet.write(total_row_num, col_num, "", total_format)

    for col_num, width in enumerate(column_widths):
        worksheet.set_column(col_num, col_num, width)

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
